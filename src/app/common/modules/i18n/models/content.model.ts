export class Content {
  public readonly languageName: string;
  public readonly json: Record<string, unknown>;

  public constructor(initial: Required<Content>) {
    this.languageName = initial.languageName;
    this.json = initial.json;
  }
}
