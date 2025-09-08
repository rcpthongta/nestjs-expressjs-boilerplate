import * as winston from "winston";

export interface TransformableOptions extends winston.Logform.TransformableInfo {
  context: string;
  ms: string;
  label: string;
  message: string;
  pid: string;
  rid: string;
  stack: string | string[];
  timestamp: string;
}
