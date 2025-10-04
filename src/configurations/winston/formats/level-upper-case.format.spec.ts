import * as winston from "winston";

import { levelUpperCase } from "./level-upper-case.format";

describe("levelUpperCase (Unit)", (): void => {
  describe("Success cases", (): void => {
    const format: winston.Logform.Format = levelUpperCase();

    it.each([
      {
        description: "convert lowercase level to uppercase with appropriate padding",
        input: { level: "info" },
        expected: "   INFO"
      },
      {
        description: "not pad level if it is already 7 or more characters",
        input: { level: "verbose" },
        expected: "VERBOSE"
      },
      {
        description: "preserve uppercase level formatting with appropriate padding",
        input: { level: "ERROR" },
        expected: "  ERROR"
      }
    ])("should $description", ({ input, expected }): void => {
      expect(format.transform({ ...input, message: "Test" })).toEqual(
        expect.objectContaining({
          level: expected,
          message: "Test"
        })
      );
    });
  });
});
