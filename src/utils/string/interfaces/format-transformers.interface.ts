import { TransformersArg } from "../types";

export interface FormatTransformers {
  [key: string]: (arg: TransformersArg) => string;
}
