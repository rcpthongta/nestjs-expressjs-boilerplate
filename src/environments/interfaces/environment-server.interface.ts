import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentServerOptions {
  readonly port: number | Joi.NumberSchema;
}

export type EnvironmentServer = OnlyData<EnvironmentServerOptions>;
export type EnvironmentServerSchema = OnlySchema<EnvironmentServerOptions>;
