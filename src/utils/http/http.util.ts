import languageParser from "accept-language-parser";

export class HttpUtil {
  public static parseAcceptLanguage(acceptLanguage?: string): string[] | null {
    if (!acceptLanguage) {
      return null;
    }

    const languages: languageParser.Language[] = languageParser.parse(acceptLanguage);

    languages.sort((first: languageParser.Language, second: languageParser.Language): number => {
      return second.quality - first.quality;
    });

    return languages.map((language: languageParser.Language): string => {
      return language.region ? `${language.code}-${language.region}` : language.code;
    });
  }
}
