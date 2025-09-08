import * as winston from "winston";

import { nanoid } from "nanoid";

import { TransformableOptions } from "../interfaces";

export const requestId: () => winston.Logform.Format = (): winston.Logform.Format => {
  return winston.format((transformable: TransformableOptions): TransformableOptions => {
    transformable.rid = nanoid();

    return transformable;
  })();
};
