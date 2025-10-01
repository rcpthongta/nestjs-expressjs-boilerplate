import * as Joi from "joi";

import { OnlyData } from "./only-data.type";
import { OnlySchema } from "./only-schema.type";

type EnvironmentServerOptions = {
  readonly port: number | Joi.NumberSchema;
};

export type EnvironmentServer = OnlyData<EnvironmentServerOptions>;
export type EnvironmentServerSchema = OnlySchema<EnvironmentServerOptions>;
