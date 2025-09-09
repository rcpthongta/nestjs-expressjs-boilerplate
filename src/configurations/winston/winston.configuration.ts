import { environment } from "@environment";

import * as winston from "winston";

import { levelUpperCase, printf, system, requestId, skipMessageByContexts } from "./formats";
import { file } from "./transports";

const configuration: winston.LoggerOptions = {
  level: environment.logging.level,
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    http: 3,
    info: 4,
    debug: 5,
    verbose: 6
  },
  format: winston.format.combine(
    system(),
    requestId(),
    skipMessageByContexts({
      list: [
        "NestApplication",
        "NestFactory",
        ...(["staging", "production"].includes(environment.profile) ? ["InstanceLoader"] : [])
      ]
    }),
    levelUpperCase(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.timestamp({ format: "MM/DD/YYYY HH:mm:ss A" }),
    winston.format.ms(),
    winston.format.colorize({
      all: true,
      colors: {
        fatal: "black",
        error: "red",
        warn: "yellow",
        http: "magenta",
        info: "green",
        verbose: "cyan",
        debug: "blue"
      }
    }),
    winston.format.label({
      label: `${environment.application.name} (v${environment.application.version})`,
      message: false
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(printf())
    }),
    file({
      level: "http",
      skipLevels: ["fatal", "error", "warn"],
      dirname: "logs",
      maxFiles: "7d",
      maxSize: "10m"
    }),
    file({
      level: "debug",
      skipLevels: ["http"],
      dirname: "logs",
      maxFiles: "7d",
      maxSize: "10m"
    })
  ]
};

export default configuration;
