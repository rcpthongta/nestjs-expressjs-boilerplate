import * as winston from "winston";

import { SkipMessageOptions, TransformableOptions } from "../interfaces";
import { SkipMessage } from "../types";

export const skipMessageByLevels: SkipMessage = (opts: SkipMessageOptions): winston.Logform.Format => {
  return winston.format((transformable: TransformableOptions): boolean | TransformableOptions => {
    if (opts.list.includes(transformable.level.toLowerCase().trim())) {
      return false;
    }

    return transformable;
  })();
};
