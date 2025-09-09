import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";

import * as winston from "winston";

import morgan from "morgan";

import { Request, Response, NextFunction, Send } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class MorganMiddleware implements NestMiddleware<Request, Response> {
  private readonly context: string = "API";
  private readonly pattern: string =
    ":method {:url} HTTP/:http-version (:referrer) > :status (:status-message) :res[x-response-time] • :remote-addr (:remote-user) :user-agent";

  private readonly logger: winston.Logger;

  private getRequestMessage(request: Request): string {
    return JSON.stringify(
      {
        method: request.method,
        path: request.path,
        headers: request.headers,
        params: Object.keys(request.params).length > 0 ? request.params : undefined,
        query: Object.keys(request.query).length > 0 ? request.query : undefined,
        body: request.body ? request.body : undefined,
        client: {
          ip: request.header("x-forwarded-for") ?? request.socket.remoteAddress,
          port: request.socket.remotePort
        }
      },
      null,
      2
    );
  }

  public getResponseMessage(response: Response): string {
    return JSON.stringify(
      {
        status: {
          code: response.statusCode,
          message: HttpStatus[response.statusCode]
        },
        headers: response.getHeaders(),
        data: response.locals.body
      },
      null,
      2
    );
  }

  public constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: winston.Logger) {
    this.logger = logger;

    morgan.token("status-message", (_request: Request, response: Response): string => {
      return response.statusMessage;
    });
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.logger.debug("Request " + this.getRequestMessage(request), {
      context: this.context
    });

    const send: Send = response.send;

    response.send = (body?: unknown): Response => {
      response.locals.body = body;

      return send.call(response, body);
    };

    morgan(this.pattern, {
      stream: {
        write: (message: string): void => {
          this.logger.debug("Response " + this.getResponseMessage(response), {
            context: this.context
          });
          this.logger.log("http", message.trim().replaceAll(" (-)", ""), {
            context: this.context
          });
        }
      }
    })(request, response, next);
  }
}
