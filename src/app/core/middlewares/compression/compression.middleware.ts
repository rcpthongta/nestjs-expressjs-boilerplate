import { Injectable, NestMiddleware } from "@nestjs/common";

import compression from "compression";

import { Handler, Request, Response, NextFunction } from "express";

@Injectable()
export class CompressionMiddleware implements NestMiddleware<Request, Response> {
  private readonly middleware: Handler;

  public constructor() {
    this.middleware = compression();
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.middleware(request, response, next);
  }
}
