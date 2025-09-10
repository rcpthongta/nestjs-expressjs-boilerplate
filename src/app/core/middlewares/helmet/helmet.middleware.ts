import { Injectable, NestMiddleware } from "@nestjs/common";

import helmet from "helmet";

import { Request, Response, NextFunction, Handler } from "express";

@Injectable()
export class HelmetMiddleware implements NestMiddleware<Request, Response> {
  private readonly middleware: Handler;

  public constructor() {
    this.middleware = helmet();
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.middleware(request, response, next);
  }
}
