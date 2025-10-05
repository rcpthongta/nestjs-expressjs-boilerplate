import { HttpUtil } from "./http.util";

describe("HttpUtil (Unit)", (): void => {
  it("should be defined", (): void => {
    expect(HttpUtil).toBeDefined();
  });

  describe("Success cases", (): void => {
    it("should correctly parse 'Accept-Language' header with multiple languages and quality values", (): void => {
      expect(HttpUtil.parseAcceptLanguage("en-US,en;q=0.9")).toEqual(["en-US", "en"]);
    });

    it("should parse single language without region and quality value", (): void => {
      expect(HttpUtil.parseAcceptLanguage("fr;q=0.9")).toEqual(["fr"]);
    });

    it("should parse and sort languages by descending quality values", (): void => {
      expect(HttpUtil.parseAcceptLanguage("es;q=0.3, fr;q=0.9, en;q=0.5")).toEqual(["fr", "en", "es"]);
    });

    it.each([
      {
        name: "should return null if accept-language header is undefined",
        input: undefined
      },
      {
        name: "should return null if accept-language header is null",
        input: null
      },
      {
        name: "should return null if accept-language header is empty",
        input: ""
      }
    ])("$name", ({ input }): void => {
      expect(HttpUtil.parseAcceptLanguage(input)).toBeNull();
    });
  });
});
