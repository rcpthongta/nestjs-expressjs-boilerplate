export type FormatArgs = (string | { [key: string]: string | number | boolean })[];
export type FormatTransformers = {
  [key: string]: (arg: string | number | boolean) => string;
};
