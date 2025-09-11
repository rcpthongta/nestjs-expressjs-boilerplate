import * as winston from "winston";

export interface TransformableOptions extends winston.Logform.TransformableInfo {
  context: string;
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
