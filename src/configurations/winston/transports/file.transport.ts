import { environment } from "@environment";

import WinstonDailyRotateFile from "winston-daily-rotate-file";

import * as winston from "winston";

import { printf, skipMessageByContexts, skipMessageByLevels } from "../formats";
import { FileOptions } from "../interfaces";

export const file: (options: FileOptions) => WinstonDailyRotateFile = (
  options: FileOptions
): WinstonDailyRotateFile => {
  return new WinstonDailyRotateFile({
    level: options.level,
    format: winston.format.combine(
      winston.format.uncolorize({
        level: true,
        message: true,
        raw: true
      }),
      skipMessageByLevels({
        list: options.skipLevels ?? []
      }),
      skipMessageByContexts({
        list: options.skipContexts ?? []
      }),
      options.json ? winston.format.json() : printf()
    ),
    dirname: options.dirname,
    filename: `${environment.application.name.toLowerCase()}-%DATE%-${options.level}.log`,
    datePattern: "MMDDYYYY",
    json: true,
    zippedArchive: true,
    auditHashType: options.auditHashType ?? "sha256",
    maxFiles: options.maxFiles,
    maxSize: options.maxSize
  });
};
