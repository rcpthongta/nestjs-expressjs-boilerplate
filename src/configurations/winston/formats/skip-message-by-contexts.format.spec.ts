import * as winston from "winston";

import { skipMessageByContexts } from "./skip-message-by-contexts.format";

describe("skipMessageByContexts (Unit)", (): void => {
  describe("Success cases", (): void => {
    it("should skip log message if context is in skip list", (): void => {
      const format: winston.Logform.Format = skipMessageByContexts({ list: ["Bootstrap"] });
      const output: boolean | winston.Logform.TransformableInfo = format.transform({
        level: "info",
        message: "Test",
        context: "Bootstrap"
      });

      expect(output).toBeFalsy();
    });

    it.each([
      {
        name: "should allow log message if context does not match any item in skip list",
        list: ["Test"]
      },
      {
        name: "should allow log message if context is not in skip list",
        list: []
      }
    ])("$name", ({ list }): void => {
      const format: winston.Logform.Format = skipMessageByContexts({ list });
      const input: winston.Logform.TransformableInfo = {
        level: "info",
        message: "Test",
        context: "Bootstrap"
      };
      const output: boolean | winston.Logform.TransformableInfo = format.transform(input);

      expect(output).toEqual(expect.objectContaining(input));
    });

    it.each([
      {
        description: "undefined",
        context: undefined
      },
      {
        description: "null",
        context: null
      },
      {
        description: "",
        context: "empty"
      }
    ])("should allow log message if context is $description", ({ context }): void => {
      const format: winston.Logform.Format = skipMessageByContexts({ list: ["Bootstrap"] });
      const input: winston.Logform.TransformableInfo = {
        level: "warn",
        message: "Something happened",
        context
      };
      const output: boolean | winston.Logform.TransformableInfo = format.transform(input);

      expect(output).toEqual(expect.objectContaining(input));
    });
  });
});
