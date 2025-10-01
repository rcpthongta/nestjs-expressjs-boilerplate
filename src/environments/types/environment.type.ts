import * as Joi from "joi";

import { OnlyData } from "./only-data.type";
import { OnlySchema } from "./only-schema.type";

import { EnvironmentApplication, EnvironmentApplicationSchema } from "./environment-application.type";
import { EnvironmentLogging, EnvironmentLoggingSchema } from "./environment-logging.type";
import { EnvironmentSecurity, EnvironmentSecuritySchema } from "./environment-security.type";
import { EnvironmentServer, EnvironmentServerSchema } from "./environment-server.type";
import { EnvironmentSwagger, EnvironmentSwaggerSchema } from "./environment-swagger.type";

type EnvironmentOptions = {
  readonly profile: string | Joi.StringSchema;
  readonly application: EnvironmentApplication | Joi.ObjectSchema<EnvironmentApplicationSchema>;
  readonly server: EnvironmentServer | Joi.ObjectSchema<EnvironmentServerSchema>;
  readonly security: EnvironmentSecurity | Joi.ObjectSchema<EnvironmentSecuritySchema>;
  readonly logging: EnvironmentLogging | Joi.ObjectSchema<EnvironmentLoggingSchema>;
  readonly swagger: EnvironmentSwagger | Joi.ObjectSchema<EnvironmentSwaggerSchema>;
};

export type Environment = OnlyData<EnvironmentOptions>;
export type EnvironmentSchema = OnlySchema<EnvironmentOptions>;
