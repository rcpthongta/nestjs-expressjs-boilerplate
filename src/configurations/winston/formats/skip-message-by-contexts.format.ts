import * as winston from "winston";

import { SkipMessageOptions, TransformableOptions } from "../interfaces";

export function skipMessageByContexts(opts: SkipMessageOptions): winston.Logform.Format {
  return winston.format((transformable: TransformableOptions): boolean | TransformableOptions => {
    if (opts.list.includes(transformable.context)) {
      return false;
    }

    return transformable;
  })();
}
