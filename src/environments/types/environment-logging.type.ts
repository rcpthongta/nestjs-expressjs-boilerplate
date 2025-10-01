import * as Joi from "joi";

import { OnlyData } from "./only-data.type";
import { OnlySchema } from "./only-schema.type";

type EnvironmentLoggingOptions = {
  readonly level: string | Joi.StringSchema;
};

export type EnvironmentLogging = OnlyData<EnvironmentLoggingOptions>;
export type EnvironmentLoggingSchema = OnlySchema<EnvironmentLoggingOptions>;
