import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentSecurityRequestOptions {
  readonly jsonLimit: string | Joi.StringSchema;
  readonly urlencodedLimit: string | Joi.StringSchema;
}

export type EnvironmentSecurityRequest = OnlyData<EnvironmentSecurityRequestOptions>;
export type EnvironmentSecurityRequestSchema = OnlySchema<EnvironmentSecurityRequestOptions>;

interface EnvironmentSecurityThrottlerOptions {
  readonly ttl: number | Joi.NumberSchema;
  readonly limit: number | Joi.NumberSchema;
}

export type EnvironmentSecurityThrottler = OnlyData<EnvironmentSecurityThrottlerOptions>;
export type EnvironmentSecurityThrottlerSchema = OnlySchema<EnvironmentSecurityThrottlerOptions>;

interface EnvironmentSecurityOptions {
  readonly request: EnvironmentSecurityRequest | Joi.ObjectSchema<EnvironmentSecurityRequestSchema>;
  readonly throttler: EnvironmentSecurityThrottler | Joi.ObjectSchema<EnvironmentSecurityThrottlerSchema>;
}

export type EnvironmentSecurity = OnlyData<EnvironmentSecurityOptions>;
export type EnvironmentSecuritySchema = OnlySchema<EnvironmentSecurityOptions>;
