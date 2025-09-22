import { OmitType } from "@nestjs/swagger";

export class WrapperResponseStatusDto {
  public code: number;
  public message: string;

  public constructor(initial: Required<WrapperResponseStatusDto>) {
    this.code = initial.code;
    this.message = initial.message;
  }
}

export class WrapperResponseDto<T> {
  public success: boolean;
  public status: WrapperResponseStatusDto;
  public message: string;
  public payload: T;

  public constructor(initial: Required<WrapperResponseDto<T>>) {
    this.success = initial.success;
    this.status = initial.status;
    this.message = initial.message;
    this.payload = initial.payload;
  }
}

export class WrapperResponseErrorDto extends OmitType(WrapperResponseDto, ["payload"]) {
  public error: string | object;

  public constructor(initial: Required<WrapperResponseErrorDto>) {
    super();

    this.success = initial.success;
    this.status = initial.status;
    this.message = initial.message;
    this.error = initial.error;
  }
}
