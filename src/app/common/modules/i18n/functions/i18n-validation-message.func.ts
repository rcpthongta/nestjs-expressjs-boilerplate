import { TranslateOptions } from "../interfaces";
import { I18nValidationMessage } from "../types";

export const i18nValidationMessage: I18nValidationMessage = (
  key: string,
  options?: Omit<TranslateOptions, "language">
): string => {
  return `i18n::${key}${options?.args ? `||${JSON.stringify(options.args)}` : ""}`;
};
