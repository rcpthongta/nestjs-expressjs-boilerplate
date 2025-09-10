import { Inject, Injectable, NestMiddleware } from "@nestjs/common";

import * as winston from "winston";

import morgan from "morgan";

import { Handler, Request, Response, NextFunction } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class MorganMiddleware implements NestMiddleware<Request, Response> {
  private readonly middleware: Handler;

  public constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: winston.Logger) {
    morgan.token("status-message", (_request: Request, response: Response): string => {
      return response.statusMessage;
    });

    this.middleware = morgan(
      ":method {:url} HTTP/:http-version (:referrer) > :status (:status-message) :res[x-response-time] • :remote-addr (:remote-user) :user-agent",
      {
        stream: {
          write: (message: string): void => {
            logger.log("http", message.trim().replaceAll(" (-)", ""), {
              context: "API"
            });
          }
        }
      }
    );
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.middleware(request, response, next);
  }
}
