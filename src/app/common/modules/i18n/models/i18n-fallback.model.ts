import { I18nModuleFallbackOptions } from "../interfaces";

export class I18nFallback implements I18nModuleFallbackOptions {
  readonly fallbacks: Record<string, string>;
  readonly fallbackLanguage: string;

  public constructor(initial: I18nModuleFallbackOptions) {
    this.fallbacks = initial.fallbacks;
    this.fallbackLanguage = initial.fallbackLanguage;
  }
}
