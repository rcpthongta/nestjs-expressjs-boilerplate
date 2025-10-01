import stringFormat from "string-format";

import { FormatException } from "./exceptions";
import { FormatArgs, FormatTransformers } from "./types";

export class StringUtil {
  private static shouldApplyTransformers(transformers?: FormatTransformers | null): transformers is FormatTransformers {
    return transformers !== null && transformers !== undefined && Object.keys(transformers).length > 0;
  }

  public static format(template: string, args: FormatArgs, transformers?: FormatTransformers | null): string {
    try {
      return this.shouldApplyTransformers(transformers)
        ? stringFormat.create(transformers)(template, ...args)
        : stringFormat(template, ...args);
    } catch (error: unknown) {
      throw new FormatException(error);
    }
  }
}
