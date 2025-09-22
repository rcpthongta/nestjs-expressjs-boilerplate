export interface ErrorResult {
  success: boolean;
  message: string;
  statusCode: number;
  data: string | object;
}
