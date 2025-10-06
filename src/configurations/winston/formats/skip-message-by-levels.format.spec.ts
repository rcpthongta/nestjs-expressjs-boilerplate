import * as winston from "winston";

import { skipMessageByLevels } from "./skip-message-by-levels.format";

describe("skipMessageByLevels (Unit)", (): void => {
  describe("Success cases", (): void => {
    it("should skip log message if level is in skip list", (): void => {
      const formatter: winston.Logform.Format = skipMessageByLevels({ list: ["info"] });
      const output: boolean | winston.Logform.TransformableInfo = formatter.transform({
        level: "info",
        message: "Test",
        context: "Bootstrap"
      });

      expect(output).toBeFalsy();
    });

    it.each([
      {
        name: "should allow log message if level does not match any item in skip list",
        list: ["debug"]
      },
      {
        name: "should allow log message if level is not in skip list",
        list: []
      }
    ])("$name", ({ list }): void => {
      const formatter: winston.Logform.Format = skipMessageByLevels({ list });
      const input: winston.Logform.TransformableInfo = {
        level: "info",
        message: "Test",
        context: "Bootstrap"
      };
      const output: boolean | winston.Logform.TransformableInfo = formatter.transform(input);

      expect(output).toEqual(expect.objectContaining(input));
    });
  });
});
