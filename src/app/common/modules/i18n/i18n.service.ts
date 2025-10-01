import { FormatArgs, StringUtil } from "@util";

import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

import { ClsService } from "nestjs-cls";

import { TranslateException } from "./exceptions";
import { I18nModuleFallbackOptions as I18nFallback, TranslateOptions } from "./interfaces";
import { Dictionary, DictionaryContents, TranslateArgs } from "./types";

import { I18N_FALLBACK, I18N_SOURCE } from "./i18n.constant";
import { I18nSource } from "./i18n.source";

@Injectable()
export class I18nService implements OnModuleInit {
  private readonly cls: ClsService;
  private readonly fallback: I18nFallback;
  private readonly source: I18nSource;

  private dictionary!: Dictionary;

  private resolveLanguage(language: string): string {
    const supported: string[] = this.source.getSupportedLanguages();

    if (supported.includes(language)) {
      return language;
    }

    const toWildcard: string = language.includes("-") ? `${language.split("-").at(0)}-*` : language;
    const fallbackLanguage: string = this.fallback.fallbacks[language] ?? this.fallback.fallbacks[toWildcard];

    if (fallbackLanguage && supported.includes(fallbackLanguage)) {
      return fallbackLanguage;
    }

    return language;
  }

  private message(candidates: string[], key: string): string | null {
    let message: string | null = null;

    for (const language of candidates) {
      const resolved: string = this.resolveLanguage(language);
      const content: DictionaryContents = this.dictionary[resolved];

      if (!content) {
        continue;
      }

      const value: string = content[key];

      if (value) {
        message = value;

        break;
      }
    }

    return message;
  }

  private format(message: string, args?: TranslateArgs): string {
    if (!args) {
      return message;
    }

    const data: FormatArgs =
      typeof args === "string" || (typeof args === "object" && !Array.isArray(args)) ? [args] : args;

    return StringUtil.format(message, data);
  }

  public constructor(
    cls: ClsService,
    @Inject(I18N_FALLBACK) fallback: I18nFallback,
    @Inject(I18N_SOURCE) source: I18nSource
  ) {
    this.cls = cls;
    this.fallback = fallback;
    this.source = source;
  }

  public async onModuleInit(): Promise<void> {
    if (!this.dictionary) {
      this.dictionary = await this.source.load();
    }
  }

  public translate(key: string, options?: TranslateOptions): string {
    const languages: string[] = options?.language ? [options.language] : (this.cls.get("languages") ?? []);
    const candidates: string[] = Array.from(new Set<string>([...languages, this.fallback.fallbackLanguage]));
    const message: string | null = this.message(candidates, key);

    if (!message) {
      throw new TranslateException(key, this.source.getSupportedLanguages());
    }

    return this.format(message, options?.args);
  }
}
