import { HttpUtil } from "./http.util";

describe("HttpUtil (Unit)", (): void => {
  it("should be defined", (): void => {
    expect(HttpUtil).toBeDefined();
  });

  describe("Success cases", (): void => {
    it("should parse accept language header", (): void => {
      expect(HttpUtil.parseAcceptLanguage("en-US,en;q=0.9")).toEqual(["en-US", "en"]);
    });

    it.each([
      {
        description: "should return null if accept-language header is undefined",
        input: undefined
      },
      {
        description: "should return null if accept-language header is null",
        input: null
      },
      {
        description: "should return null if accept-language header is empty",
        input: ""
      }
    ])("$description", (arg): void => {
      expect(HttpUtil.parseAcceptLanguage(arg.input)).toBeNull();
    });
  });
});
