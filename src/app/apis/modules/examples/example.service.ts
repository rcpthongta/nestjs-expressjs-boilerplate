import { Injectable } from "@nestjs/common";

@Injectable()
export class ExampleService {
  public hello(): string {
    return "Hello World";
  }
}
