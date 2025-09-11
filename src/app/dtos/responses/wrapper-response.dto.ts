export class WrapperResponseHttpDto {
  public readonly code: number;
  public readonly message: string;

  public constructor(initial: Required<WrapperResponseHttpDto>) {
    this.code = initial.code;
    this.message = initial.message;
  }
}

export class WrapperResponseHeaderDto {
  public readonly timestamp: string;

  public constructor(initial: Required<WrapperResponseHeaderDto>) {
    this.timestamp = initial.timestamp;
  }
}

export class WrapperResponseDto<T> {
  public readonly success: boolean;
  public readonly http: WrapperResponseHttpDto;
  public readonly header: WrapperResponseHeaderDto;
  public readonly payload: T;

  public constructor(initial: Required<WrapperResponseDto<T>>) {
    this.success = initial.success;
    this.http = initial.http;
    this.header = initial.header;
    this.payload = initial.payload;
  }
}
