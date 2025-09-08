import { Module } from "@nestjs/common";

import { ApiModule } from "./apis";
import { CoreModule } from "./core";

@Module({
  imports: [CoreModule, ApiModule]
})
export class AppModule {}
