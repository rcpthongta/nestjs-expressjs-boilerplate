export class FlattenObjectStack {
  public readonly obj: Record<string, unknown>;
  public readonly prefix: string;

  public constructor(initial: Required<FlattenObjectStack>) {
    this.obj = initial.obj;
    this.prefix = initial.prefix;
  }
}
