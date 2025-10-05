import * as winston from "winston";

import { levelUpperCase } from "./level-upper-case.format";

describe("levelUpperCase (Unit)", (): void => {
  describe("Success cases", (): void => {
    const format: winston.Logform.Format = levelUpperCase();

    it.each([
      {
        name: "should convert lowercase level to uppercase with appropriate padding",
        input: { level: "info" },
        expected: "   INFO"
      },
      {
        name: "should not pad level if it is already 7 or more characters",
        input: { level: "verbose" },
        expected: "VERBOSE"
      },
      {
        name: "should preserve uppercase level formatting with appropriate padding",
        input: { level: "ERROR" },
        expected: "  ERROR"
      }
    ])("$name", ({ input, expected }): void => {
      expect(format.transform({ ...input, message: "Test" })).toEqual(
        expect.objectContaining({ level: expected, message: "Test" })
      );
    });
  });
});
