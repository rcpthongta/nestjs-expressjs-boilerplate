export interface FormatTransformers {
  [key: string]: (arg: string | number | boolean) => string;
}
