import * as winston from "winston";

export interface TransformableOptions extends winston.Logform.TransformableInfo {
  cause: unknown;
  context: string;
  error: Error;
  hostname: string;
  label: string;
  message: string;
  ms: string;
  node: string;
  pid: string;
  platform: string;
  rid: string;
  stack: string | string[];
  timestamp: string;
}
