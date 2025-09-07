import { Test, TestingModule } from "@nestjs/testing";

import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";

describe("ExampleController (Integration)", (): void => {
  let controller: ExampleController;

  beforeAll(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService]
    }).compile();

    controller = module.get(ExampleController);
  });

  it("should be defined", (): void => {
    expect(controller).toBeDefined();
  });

  describe("Success cases", (): void => {
    it('should return "Hello World"', (): void => {
      const expected: string = "Hello World";

      expect(controller.index()).toBe(expected);
    });
  });
});
