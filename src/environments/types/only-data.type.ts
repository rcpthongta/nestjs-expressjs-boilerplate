import * as Joi from "joi";

export type OnlyData<T> = {
  [P in keyof T]-?: Exclude<T[P], Joi.Schema>;
};
