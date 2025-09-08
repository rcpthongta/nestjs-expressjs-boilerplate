import * as Joi from "joi";

import {
  EnvironmentApplicationSchema,
  EnvironmentLoggingSchema,
  EnvironmentSchema,
  EnvironmentServerSchema
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
  logging: Joi.object<EnvironmentLoggingSchema>({
    level: Joi.string().valid("fatal", "error", "warn", "http", "info", "debug", "verbose").required()
  }).required()
}).required();
