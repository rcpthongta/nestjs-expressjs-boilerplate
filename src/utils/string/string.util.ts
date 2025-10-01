import stringFormat from "string-format";

import { FormatException } from "./exceptions";
import { FormatArgs, FormatTransformers } from "./types";

export class StringUtil {
  private static shouldApplyTransformers(transformer?: FormatTransformers | null): transformer is FormatTransformers {
    return transformer !== null && transformer !== undefined && Object.keys(transformer).length > 0;
  }

  public static format(template: string, args: FormatArgs, transformer?: FormatTransformers | null): string {
    try {
      return this.shouldApplyTransformers(transformer)
        ? stringFormat.create(transformer)(template, ...args)
        : stringFormat(template, ...args);
    } catch (error: unknown) {
      throw new FormatException(error);
    }
  }
}
