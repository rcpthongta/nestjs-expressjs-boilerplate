import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";

import * as winston from "winston";

import { Request, Response, NextFunction } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class RequestResponseDetailMiddleware implements NestMiddleware<Request, Response> {
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
          ip: request.socket.remoteAddress,
          port: request.socket.remotePort
        }
      },
      null,
      2
    );
  }

  private getResponseMessage(response: Response): string {
    return JSON.stringify(
      {
        status: {
          code: response.statusCode,
          message: HttpStatus[response.statusCode]
        },
        headers: response.getHeaders()
      },
      null,
      2
    );
  }

  public constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: winston.Logger) {
    this.logger = logger;
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.logger.debug(`Request ${this.getRequestMessage(request)}`, {
      context: "API"
    });

    response.on("finish", (): void => {
      this.logger.debug(`Response ${this.getResponseMessage(response)}`, {
        context: "API"
      });
    });

    next();
  }
}
