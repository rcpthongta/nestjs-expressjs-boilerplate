export interface I18nModuleFallbackOptions {
  readonly fallbacks: Record<string, string>;
  readonly fallbackLanguage: string;
}

export interface I18nModuleOptions {
  readonly fallback: I18nModuleFallbackOptions;
  readonly path: string;
}
