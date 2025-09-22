import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { ResponseWrapperFilter } from "./response-wrapper.filter";
import { ResponseWrapperInterceptor } from "./response-wrapper.interceptor";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ResponseWrapperFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapperInterceptor
    }
  ]
})
export class ResponseWrapperModule {}
