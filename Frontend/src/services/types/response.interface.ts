export interface SuccessResponse {
  message: string;
}

export interface ResponseError {
  message: string;
  error: string;
  statusCode: number;
}
