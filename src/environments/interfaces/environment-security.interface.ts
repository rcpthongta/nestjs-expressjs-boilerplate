import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

interface EnvironmentSecurityCorsOptions {
  readonly origins: string[] | Joi.ArraySchema<string[]>;
  readonly methods: string[] | Joi.ArraySchema<string[]>;
  readonly allowedHeaders: string[] | Joi.ArraySchema<string[]>;
  readonly exposedHeaders: string[] | Joi.ArraySchema<string[]>;
  readonly credentials: boolean | Joi.BooleanSchema;
  readonly maxAge: number | Joi.NumberSchema;
}

export type EnvironmentSecurityCors = OnlyData<EnvironmentSecurityCorsOptions>;
export type EnvironmentSecurityCorsSchema = OnlySchema<EnvironmentSecurityCorsOptions>;

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
  readonly cors: EnvironmentSecurityCors | Joi.ObjectSchema<EnvironmentSecurityCorsSchema>;
  readonly request: EnvironmentSecurityRequest | Joi.ObjectSchema<EnvironmentSecurityRequestSchema>;
  readonly throttler: EnvironmentSecurityThrottler | Joi.ObjectSchema<EnvironmentSecurityThrottlerSchema>;
}

export type EnvironmentSecurity = OnlyData<EnvironmentSecurityOptions>;
export type EnvironmentSecuritySchema = OnlySchema<EnvironmentSecurityOptions>;
