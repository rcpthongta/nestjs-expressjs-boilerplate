import * as Joi from "joi";

import {
  EnvironmentApplicationSchema,
  EnvironmentLoggingSchema,
  EnvironmentSchema,
  EnvironmentSecurityRequestSchema,
  EnvironmentSecuritySchema,
  EnvironmentSecurityThrottlerSchema,
  EnvironmentServerSchema,
  EnvironmentSwaggerSchema
} from "./interfaces";

export const environmentSchema: Joi.ObjectSchema<EnvironmentSchema> = Joi.object<EnvironmentSchema>({
  profile: Joi.string().valid("development", "staging", "production").required(),
  application: Joi.object<EnvironmentApplicationSchema>({
    version: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  server: Joi.object<EnvironmentServerSchema>({
    port: Joi.number().port().required()
  }).required(),
  security: Joi.object<EnvironmentSecuritySchema>({
    request: Joi.object<EnvironmentSecurityRequestSchema>({
      jsonLimit: Joi.string()
        .pattern(/^\d+\s*(b|kb|mb|gb)$/i)
        .message('"security.request.jsonLimit" must be a valid size limit (e.g., "100kb", "2mb").')
        .required(),
      urlencodedLimit: Joi.string()
        .pattern(/^\d+\s*(b|kb|mb|gb)$/i)
        .message('"security.request.urlencodedLimit" must be a valid size limit (e.g., "100kb", "2mb").')
        .required()
    }).required(),
    throttler: Joi.object<EnvironmentSecurityThrottlerSchema>({
      ttl: Joi.number().integer().min(1).required(),
      limit: Joi.number().integer().min(1).required()
    })
  }).required(),
  logging: Joi.object<EnvironmentLoggingSchema>({
    level: Joi.string().valid("fatal", "error", "warn", "http", "info", "debug", "verbose").required()
  }).required(),
  swagger: Joi.object<EnvironmentSwaggerSchema>({
    enabled: Joi.boolean().required()
  }).required()
}).required();
