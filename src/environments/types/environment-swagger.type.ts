import * as Joi from "joi";

import { OnlyData } from "./only-data.type";
import { OnlySchema } from "./only-schema.type";

type EnvironmentSwaggerOptions = {
  readonly enabled: boolean | Joi.BooleanSchema;
};

export type EnvironmentSwagger = OnlyData<EnvironmentSwaggerOptions>;
export type EnvironmentSwaggerSchema = OnlySchema<EnvironmentSwaggerOptions>;
