import * as winston from "winston";

import { TransformableOptions } from "../interfaces";

export const levelUpperCase: () => winston.Logform.Format = (): winston.Logform.Format => {
  return winston.format((transformable: TransformableOptions): TransformableOptions => {
    transformable.level = transformable.level.toUpperCase();
    transformable.level = transformable.level.length < 7 ? transformable.level.padStart(7, " ") : transformable.level;

    return transformable;
  })();
};
