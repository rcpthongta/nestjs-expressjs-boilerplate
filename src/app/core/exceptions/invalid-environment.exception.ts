export class InvalidEnvironmentException extends Error {
  public constructor(message: string) {
    super(`Failed to validate the environment variable due to ${message}`);
  }
}
