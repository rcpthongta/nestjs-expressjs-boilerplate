export class WrapperResponseStatusDto {
  public readonly code: number;
  public readonly message: string;

  public constructor(initial: Required<WrapperResponseStatusDto>) {
    this.code = initial.code;
    this.message = initial.message;
  }
}

export class WrapperResponseDto<T> {
  public readonly success: boolean;
  public readonly status: WrapperResponseStatusDto;
  public readonly message: string;
  public readonly payload: T;

  public constructor(initial: Required<WrapperResponseDto<T>>) {
    this.success = initial.success;
    this.status = initial.status;
    this.message = initial.message;
    this.payload = initial.payload;
  }
}
