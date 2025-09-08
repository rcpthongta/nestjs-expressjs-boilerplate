import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentLoggingOptions {
  readonly level: string | Joi.StringSchema;
}

export type EnvironmentLogging = OnlyData<EnvironmentLoggingOptions>;
export type EnvironmentLoggingSchema = OnlySchema<EnvironmentLoggingOptions>;
