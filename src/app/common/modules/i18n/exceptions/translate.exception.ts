export class TranslateException extends Error {
  public constructor(key: string, supportedLanguages: string[]) {
    super(`Translation not found for key "${key}" in supported languages [${supportedLanguages.join(", ")}]`);

    this.name = new.target.name;
  }
}
