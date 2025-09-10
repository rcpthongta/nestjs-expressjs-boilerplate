import { Injectable, NestMiddleware } from "@nestjs/common";

import responseTime from "response-time";

import { Handler, Request, Response, NextFunction } from "express";

@Injectable()
export class ResponseTime implements NestMiddleware<Request, Response> {
  private readonly middleware: Handler;

  public constructor() {
    this.middleware = responseTime();
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.middleware(request, response, next);
  }
}
