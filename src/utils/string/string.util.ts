import stringFormat from "string-format";

import { FormatException } from "./exceptions";
import { FormatArgs, FormatTransformers } from "./types";

export class StringUtil {
  private static shouldApplyTransformers(transformer?: FormatTransformers | null): transformer is FormatTransformers {
    return transformer !== null && transformer !== undefined && Object.keys(transformer).length > 0;
  }

  /**
   * Formats a string by replacing placeholders with corresponding argument values.
   *
   * @param template - The template string containing placeholders.
   * @param args - An array of arguments or objects to inject into the placeholders.
   * @param transformer - Optional. A map of transformer functions to apply to placeholders (e.g., `{0!upper}`).
   *
   * @returns The formatted string with all placeholders replaced.
   *
   * @throws {FormatException} If the template is malformed, a transformer is missing, or a transformer throws an error.
   *
   * @example
   *
   * StringUtil.format("Hello {0}", ["World"]); // -> "Hello World"
   * StringUtil.format("My name is {name}", [{ name: "John" }]); // -> "My name is John"
   * StringUtil.format("Upper: {0!upper}", ["hello"], { upper: (arg: string | number | boolean): string => String(arg).toUpperCase() }) -> // "Upper: HELLO";
   */
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
