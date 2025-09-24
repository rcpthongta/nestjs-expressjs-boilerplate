import { I18nService, TranslateArgs } from "@common";

import { HttpStatus, ValidationError } from "@nestjs/common";

import { ErrorResponseException } from "../../modules";

import { FlatErrorsStack } from "./types";

export const generateFlatErrors = (errors: ValidationError[], i18n: I18nService): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const stack: FlatErrorsStack[] = [];

  for (const error of errors) {
    stack.push({ error: error, parent: result });
  }

  while (stack.length > 0) {
    const { error, parent }: FlatErrorsStack = stack.pop()!;
    const { property, constraints, children }: ValidationError = error;

    if ((children?.length ?? 0) > 0) {
      (parent as Record<string, unknown>)[property] = {};

      for (const child of children!) {
        stack.push({ error: child, parent: (parent as Record<string, unknown>)[property] });
      }
    } else if (constraints) {
      const messages: string[] = Object.values(constraints).map((message: string): string => {
        if (!message.startsWith("i18n::")) {
          return message;
        }

        const [rawKey, rawArgs]: string[] = message.slice("i18n::".length).split("||");
        const args: TranslateArgs = rawArgs ? JSON.parse(rawArgs) : {};

        return i18n.translate(rawKey, {
          args: args
        });
      });

      (parent as Record<string, unknown>)[property] = messages.length > 1 ? messages : messages[0];
    }
  }

  return result;
};

export const validationExceptionFactory = (errors: ValidationError[], i18n: I18nService): void => {
  throw new ErrorResponseException(generateFlatErrors(errors, i18n), HttpStatus.BAD_REQUEST, {
    responseMessage: {
      key: "response.error.are000003"
    }
  });
};
