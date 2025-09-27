import languageParser from "accept-language-parser";

export class HttpUtil {
  public static parseAcceptLanguage(acceptLanguage?: string | null): string[] | null {
    if (!acceptLanguage || acceptLanguage === "") return null;

    return languageParser
      .parse(acceptLanguage)
      .sort((first: languageParser.Language, second: languageParser.Language): number => second.quality - first.quality)
      .map((language: languageParser.Language): string =>
        language.region ? `${language.code}-${language.region}` : language.code
      );
  }
}
