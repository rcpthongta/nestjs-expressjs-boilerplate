import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentApplicationOptions {
  readonly version: string | Joi.StringSchema;
  readonly name: string | Joi.StringSchema;
}

export type EnvironmentApplication = OnlyData<EnvironmentApplicationOptions>;
export type EnvironmentApplicationSchema = OnlySchema<EnvironmentApplicationOptions>;
