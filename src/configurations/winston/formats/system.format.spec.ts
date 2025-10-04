import os from "node:os";
import process from "node:process";

import * as winston from "winston";

import { system } from "./system.format";

describe("system (Unit)", (): void => {
  describe("Success cases", (): void => {
    it("should add system information to log object", (): void => {
      const formatter: winston.Logform.Format = system();
      const output: boolean | winston.Logform.TransformableInfo = formatter.transform({
        level: "info",
        message: "Test"
      });

      expect(output).toEqual(
        expect.objectContaining({
          level: "info",
          message: "Test",
          hostname: os.hostname(),
          platform: os.platform(),
          pid: process.pid.toString(),
          node: process.version
        })
      );
    });
  });
});
