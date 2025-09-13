import stringFormat from "string-format";

import { FormatArgs } from "./types";

export class StringUtil {
  public static format(template: string, ...args: FormatArgs): string {
    return stringFormat(template, ...args);
  }
}
