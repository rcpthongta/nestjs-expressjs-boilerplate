import process from "node:process";

import * as winston from "winston";

import { TransformableOptions } from "../interfaces";

export const processId: () => winston.Logform.Format = (): winston.Logform.Format => {
  return winston.format((transformable: TransformableOptions): TransformableOptions => {
    transformable.pid = process.pid.toString();

    return transformable;
  })();
};
