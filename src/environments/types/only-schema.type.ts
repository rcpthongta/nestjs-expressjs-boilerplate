import * as Joi from "joi";

export type OnlySchema<T> = {
  [P in keyof T]-?: Extract<T[P], Joi.Schema>;
};
