import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentSecurityThrottlerOptions {
  readonly ttl: number | Joi.NumberSchema;
  readonly limit: number | Joi.NumberSchema;
}

export type EnvironmentSecurityThrottler = OnlyData<EnvironmentSecurityThrottlerOptions>;
export type EnvironmentSecurityThrottlerSchema = OnlySchema<EnvironmentSecurityThrottlerOptions>;

interface EnvironmentSecurityOptions {
  readonly throttler: EnvironmentSecurityThrottler | Joi.ObjectSchema<EnvironmentSecurityThrottlerSchema>;
}

export type EnvironmentSecurity = OnlyData<EnvironmentSecurityOptions>;
export type EnvironmentSecuritySchema = OnlySchema<EnvironmentSecurityOptions>;
