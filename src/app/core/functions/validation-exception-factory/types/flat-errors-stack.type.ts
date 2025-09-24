import { ValidationError } from "@nestjs/common";

export type FlatErrorsStack = { error: ValidationError; parent: unknown };
