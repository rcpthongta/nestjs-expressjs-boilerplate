import languageParser from "accept-language-parser";

export class HttpUtil {
  /**
   * Parses an HTTP `Accept-Language` header and returns an ordered list of language tags.
   *
   * @param acceptLanguage - The raw `Accept-Language` string from the HTTP request header.
   *
   * @returns An array of language codes sorted by quality, or `null` if input is empty or invalid.
   *
   * @example
   *
   * HttpUtil.parseAcceptLanguage("en-US,en;q=0.9,fr;q=0.8,th;q=0.7"); // -> ['en-US', 'en', 'fr', 'th']
   * HttpUtil.parseAcceptLanguage(null); // -> null
   * HttpUtil.parseAcceptLanguage(""); // -> null
   */
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
