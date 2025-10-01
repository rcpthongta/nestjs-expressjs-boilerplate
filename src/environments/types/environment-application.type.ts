import * as Joi from "joi";

import { OnlyData } from "./only-data.type";
import { OnlySchema } from "./only-schema.type";

type EnvironmentApplicationOptions = {
  readonly version: string | Joi.StringSchema;
  readonly name: string | Joi.StringSchema;
};

export type EnvironmentApplication = OnlyData<EnvironmentApplicationOptions>;
export type EnvironmentApplicationSchema = OnlySchema<EnvironmentApplicationOptions>;
