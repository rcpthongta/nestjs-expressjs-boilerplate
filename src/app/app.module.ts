import { Module } from "@nestjs/common";

import { ApiModule } from "./apis";

@Module({
  imports: [ApiModule]
})
export class AppModule {}
