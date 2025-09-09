import { winstonConfiguration } from "@configuration";
import { environment, environmentSchema, EnvironmentSchema } from "@environment";

import { Module, OnModuleInit } from "@nestjs/common";

import * as Joi from "joi";

import { WinstonModule } from "nest-winston";

import { InvalidEnvironmentException } from "./exceptions";

@Module({
  imports: [WinstonModule.forRoot({ ...winstonConfiguration })]
})
export class CoreModule implements OnModuleInit {
  private validEnvironment(): void {
    const { error }: Joi.ValidationResult<EnvironmentSchema> = environmentSchema.validate(environment);

    if (error) {
      throw new InvalidEnvironmentException(error.message);
    }
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
