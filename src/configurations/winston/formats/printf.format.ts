import * as winston from "winston";

import { TransformableOptions } from "../interfaces";

export const printf: () => winston.Logform.Format = (): winston.Logform.Format => {
  return winston.format.printf((transformable: TransformableOptions): string => {
    let stack: string = "";

    if (transformable.stack) {
      if (typeof transformable.stack === "string" && transformable.stack.trim()) {
        stack = `\n${transformable.stack}`;
      } else if (Array.isArray(transformable.stack) && transformable.stack.length > 0) {
        stack = `\n${transformable.stack.filter((message: string): boolean => message !== undefined).join("\n")}`;
      }
    }

    return `${transformable.label} [${transformable.pid} • ${transformable.hostname} • Node.js ${transformable.node}] ${transformable.rid} - ${transformable.timestamp}   ${transformable.level} [${transformable.context}] ${transformable.message} ${transformable.ms}${stack}`;
  });
};
