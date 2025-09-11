import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ExampleModule, HealthModule } from "./modules";

@Module({
  imports: [
    ExampleModule,
    HealthModule,
    RouterModule.register([
      {
        path: "examples",
        module: ExampleModule
      },
      {
        path: "health",
        module: HealthModule
      }
    ])
  ]
})
export class ApiModule {}
