import { TranslateOptions } from "../interfaces";

export type I18nValidationMessage = (key: string, options?: Omit<TranslateOptions, "language">) => string;
