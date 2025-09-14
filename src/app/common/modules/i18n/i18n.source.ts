import fs from "node:fs";
import fspromises from "node:fs/promises";
import path from "node:path";

import { I18nException } from "./exceptions";
import { Content, FlattenObjectStack, LanguageResource } from "./models";
import { Dictionary } from "./types";

export class I18nSource {
  private readonly encoding: BufferEncoding;
  private readonly extension: string;
  private readonly basePath: string;
  private readonly supportedLanguages: Set<string>;

  private async getLanguageDirectories(): Promise<fs.Dirent[]> {
    let entries: fs.Dirent[];

    try {
      entries = await fspromises.readdir(this.basePath, {
        encoding: this.encoding,
        withFileTypes: true
      });
    } catch (error: unknown) {
      throw new I18nException(
        `Cannot read dictionary language directories at ${this.basePath}. Please check if the path exists and permissions are correct`,
        {
          cause: error
        }
      );
    }

    entries = entries.filter((entry: fs.Dirent): boolean => entry.isDirectory());

    if (entries.length === 0) {
      throw new I18nException(
        `No dictionary language directories found in ${this.basePath}. Please ensure the directory is not empty and contains language folders`
      );
    }

    return entries;
  }

  private async getLanguageResource(): Promise<LanguageResource[]> {
    const directories: fs.Dirent[] = await this.getLanguageDirectories();
    const promises: Promise<fs.Dirent[]>[] = directories.map(async (directory: fs.Dirent): Promise<fs.Dirent[]> => {
      const languageName: string = directory.name;
      const languagePath: string = path.join(directory.parentPath, languageName);
      const entries: fs.Dirent[] = await fspromises.readdir(languagePath, {
        encoding: this.encoding,
        withFileTypes: true
      });

      if (entries.length === 0) {
        throw new I18nException(
          `No dictionary files found in language directory "${languageName}" at "${languagePath}". At least one file (e.g., response.json) is required`
        );
      }

      return entries;
    });
    const entries: fs.Dirent<string>[][] = await Promise.all(promises);

    return entries.flatMap((file: fs.Dirent[]): LanguageResource[] => {
      return file
        .filter((entry: fs.Dirent): boolean => entry.isFile())
        .map((entry: fs.Dirent) => {
          return new LanguageResource({
            languageName: path.basename(entry.parentPath),
            languagePath: entry.parentPath,
            fileName: entry.name
          });
        });
    });
  }

  private flattenObject(json: Record<string, unknown>, parentKey: string): Record<string, string> {
    const result: Record<string, string> = {};
    const stack: FlattenObjectStack[] = [
      new FlattenObjectStack({
        obj: json,
        prefix: parentKey
      })
    ];

    while (stack.length > 0) {
      const { obj, prefix }: FlattenObjectStack = stack.pop()!;

      for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (Array.isArray(value)) {
          throw new I18nException(
            `Invalid dictionary structure. Arrays are not supported at "${newKey}" only nested objects and string values are allowed`
          );
        }

        if (value && typeof value === "object") {
          stack.push(new FlattenObjectStack({ obj: value as Record<string, unknown>, prefix: newKey }));
        } else {
          result[newKey] = String(value);
        }
      }
    }

    return result;
  }

  public constructor(basePath: string) {
    this.encoding = "utf8";
    this.extension = ".json";
    this.basePath = basePath;
    this.supportedLanguages = new Set<string>();
  }

  public async load(): Promise<Dictionary> {
    const resources: LanguageResource[] = await this.getLanguageResource();
    const promises: Promise<Content>[] = resources.map(
      async ({ fileName, languageName, languagePath }: LanguageResource): Promise<Content> => {
        if (path.extname(fileName) !== this.extension) {
          throw new I18nException(
            `Cannot read the dictionary file "${fileName}" at "${languagePath}". Only files with the "${this.extension}" extension are supported`
          );
        }

        const groupName: string = path.basename(fileName, this.extension);
        const fullPath: string = path.join(languagePath, fileName);
        const content: string = await fspromises.readFile(fullPath, this.encoding);

        let parsed: Record<string, unknown>;

        try {
          parsed = JSON.parse(content);
        } catch (error: unknown) {
          throw new I18nException(`Failed to parse JSON content from file "${fileName}" at "${languagePath}"`, {
            cause: error
          });
        }

        return new Content({
          languageName: languageName,
          json: this.flattenObject(parsed, groupName)
        });
      }
    );
    const contents = await Promise.all(promises);

    return contents.reduce<Dictionary>((languageMap: Dictionary, contentEntry: Content): Dictionary => {
      const { json, languageName }: Content = contentEntry;

      this.supportedLanguages.add(languageName);

      if (!languageMap[languageName]) {
        languageMap[languageName] = {};
      }

      Object.assign(languageMap[languageName], json);

      return languageMap;
    }, {});
  }

  public getSupportedLanguages(): string[] {
    return Array.from(this.supportedLanguages);
  }
}
