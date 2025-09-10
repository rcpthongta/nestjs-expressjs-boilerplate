import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

import { EnvironmentApplication, EnvironmentApplicationSchema } from "./environment-application.interface";
import { EnvironmentLogging, EnvironmentLoggingSchema } from "./environment-logging.interface";
import { EnvironmentSecurity, EnvironmentSecuritySchema } from "./environment-security.interface";
import { EnvironmentServer, EnvironmentServerSchema } from "./environment-server.interface";
import { EnvironmentSwagger, EnvironmentSwaggerSchema } from "./environment-swagger.interface";

interface EnvironmentOptions {
  readonly profile: string | Joi.StringSchema;
  readonly application: EnvironmentApplication | Joi.ObjectSchema<EnvironmentApplicationSchema>;
  readonly server: EnvironmentServer | Joi.ObjectSchema<EnvironmentServerSchema>;
  readonly security: EnvironmentSecurity | Joi.ObjectSchema<EnvironmentSecuritySchema>;
  readonly logging: EnvironmentLogging | Joi.ObjectSchema<EnvironmentLoggingSchema>;
  readonly swagger: EnvironmentSwagger | Joi.ObjectSchema<EnvironmentSwaggerSchema>;
}

export type Environment = OnlyData<EnvironmentOptions>;
export type EnvironmentSchema = OnlySchema<EnvironmentOptions>;
