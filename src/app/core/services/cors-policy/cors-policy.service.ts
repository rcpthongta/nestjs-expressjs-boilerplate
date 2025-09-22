import { ErrorResponseException } from "@core";
import { environment, EnvironmentSecurity } from "@environment";

import { HttpStatus, Injectable } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

@Injectable()
export class CorsPolicyService {
  public getConfiguration(): CorsOptions {
    const { cors }: EnvironmentSecurity = environment.security;

    return {
      methods: cors.methods,
      origin: (origin: string, callback: (error: Error | null, origin?: boolean) => void) => {
        if ((cors.origins.length === 1 && cors.origins.at(0) === "*") || cors.origins.includes(origin)) {
          callback(null, true);
        } else {
          callback(
            new ErrorResponseException(
              "Access to this resource from the current origin is blocked by the CORS policy",
              HttpStatus.FORBIDDEN,
              {
                responseMessage: {
                  key: "response.error.are000002",
                  language: "en"
                }
              }
            ),
            false
          );
        }
      },
      allowedHeaders: cors.allowedHeaders,
      exposedHeaders: cors.exposedHeaders,
      credentials: cors.credentials,
      maxAge: cors.maxAge,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
      preflightContinue: false
    };
  }
}
