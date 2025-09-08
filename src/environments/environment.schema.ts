import * as Joi from "joi";

import { EnvironmentApplicationSchema, EnvironmentSchema, EnvironmentServerSchema } from "./interfaces";

export const environmentSchema: Joi.ObjectSchema<EnvironmentSchema> = Joi.object<EnvironmentSchema>({
  profile: Joi.string().valid("development", "staging", "production").required(),
  application: Joi.object<EnvironmentApplicationSchema>({
    version: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  server: Joi.object<EnvironmentServerSchema>({
    port: Joi.number().port().required()
  }).required()
}).required();
