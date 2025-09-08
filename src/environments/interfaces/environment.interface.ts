import * as Joi from "joi";

import { OnlyData, OnlySchema } from "../types";

import { EnvironmentApplication, EnvironmentApplicationSchema } from "./environment-application.interface";
import { EnvironmentServer, EnvironmentServerSchema } from "./environment-server.interface";

interface EnvironmentOptions {
  readonly profile: string | Joi.StringSchema;
  readonly application: EnvironmentApplication | Joi.ObjectSchema<EnvironmentApplicationSchema>;
  readonly server: EnvironmentServer | Joi.ObjectSchema<EnvironmentServerSchema>;
}

export type Environment = OnlyData<EnvironmentOptions>;
export type EnvironmentSchema = OnlySchema<EnvironmentOptions>;
