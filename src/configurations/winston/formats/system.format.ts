import os from "node:os";
import process from "node:process";

import * as winston from "winston";

import { TransformableOptions } from "../interfaces";

export const system: () => winston.Logform.Format = (): winston.Logform.Format => {
  return winston.format((transformable: TransformableOptions): TransformableOptions => {
    transformable.hostname = os.hostname();
    transformable.pid = process.pid.toString();
    transformable.platform = os.platform();
    transformable.node = process.version;

    return transformable;
  })();
};
