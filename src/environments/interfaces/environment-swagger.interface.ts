import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentSwaggerOptions {
  readonly enabled: boolean | Joi.BooleanSchema;
}

export type EnvironmentSwagger = OnlyData<EnvironmentSwaggerOptions>;
export type EnvironmentSwaggerSchema = OnlySchema<EnvironmentSwaggerOptions>;
