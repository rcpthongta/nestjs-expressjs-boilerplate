import * as winston from "winston";

import { TransformableOptions } from "../interfaces";

function generateErrorCause(cause: unknown): string {
  let result: string = "";

  if (cause) {
    result += "\n[Caused by] ";

    if (cause instanceof Error) {
      result += cause.stack;
    } else if (typeof cause === "string" || typeof cause === "boolean" || typeof cause === "number") {
      result += String(cause);
    } else if (typeof cause === "object") {
      result += JSON.stringify(cause);
    }
  }

  return result;
}

export function printf(): winston.Logform.Format {
  return winston.format.printf((transformable: TransformableOptions): string => {
    let stack: string = "";

    if (transformable.error) {
      stack = `\n${transformable.error.stack}`;

      const cause: string = generateErrorCause(transformable.error.cause);

      if (cause !== "") stack += cause;
    }

    if (stack === "" && transformable.stack) {
      if (typeof transformable.stack === "string" && transformable.stack.trim()) {
        stack = `\n${transformable.stack}`;
      } else if (Array.isArray(transformable.stack) && transformable.stack.length > 0) {
        stack = `\n${transformable.stack.filter((message: string): boolean => message !== undefined).join("\n")}`;
      }

      const cause: string = generateErrorCause(transformable.cause);

      if (cause !== "") stack += cause;
    }

    return `${transformable.label} [${transformable.pid} • ${transformable.hostname} (${transformable.platform}) • Node.js ${transformable.node}] ${transformable.rid} - ${transformable.timestamp}   ${transformable.level} [${transformable.context}] ${transformable.message} ${transformable.ms}${stack}`;
  });
}
