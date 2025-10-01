export class FormatException extends Error {
  public constructor(cause: unknown) {
    super("Failed to format string", { cause });

    this.name = new.target.name;
  }
}
