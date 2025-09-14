export class LanguageResource {
  public readonly languageName: string;
  public readonly languagePath: string;
  public readonly fileName: string;

  public constructor(initial: Required<LanguageResource>) {
    this.languageName = initial.languageName;
    this.languagePath = initial.languagePath;
    this.fileName = initial.fileName;
  }
}
