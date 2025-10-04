import * as winston from "winston";

import { nanoid } from "nanoid";
import { ClsServiceManager } from "nestjs-cls";

import { requestId } from "./request-id.format";

jest.mock("nanoid", (): object => ({
  nanoid: jest.fn()
}));

jest.mock("nestjs-cls", (): object => ({
  ClsServiceManager: {
    getClsService: jest.fn()
  }
}));

describe("requestId (Unit)", (): void => {
  const mockGetId: jest.Mock = jest.fn();

  beforeEach((): void => {
    (ClsServiceManager.getClsService as jest.Mock).mockReturnValue({
      getId: mockGetId
    });
  });

  describe("Success cases", (): void => {
    it("should inject the request ID from ClsService if available", (): void => {
      mockGetId.mockReturnValue("cls-id-123");

      const formatter: winston.Logform.Format = requestId();
      const output: boolean | winston.Logform.TransformableInfo = formatter.transform({
        level: "info",
        message: "Test"
      });

      expect(output).toEqual(
        expect.objectContaining({
          level: "info",
          message: "Test",
          rid: "cls-id-123"
        })
      );
      expect(mockGetId).toHaveBeenCalled();
      expect(nanoid).not.toHaveBeenCalled();
    });

    it("should generate a new request ID using nanoid if ClsService returns undefined", (): void => {
      mockGetId.mockReturnValue(undefined);
      (nanoid as jest.Mock).mockReturnValue("generated-nanoid");

      const formatter: winston.Logform.Format = requestId();
      const output: boolean | winston.Logform.TransformableInfo = formatter.transform({
        level: "info",
        message: "Test"
      });

      expect(output).toEqual(
        expect.objectContaining({
          level: "info",
          message: "Test",
          rid: "generated-nanoid"
        })
      );
      expect(mockGetId).toHaveBeenCalled();
      expect(nanoid).toHaveBeenCalled();
    });
  });
});
