import { TestBed } from "@suites/unit";

import { ExampleService } from "./example.service";

describe("ExampleService (Unit)", (): void => {
  let service: ExampleService;

  beforeAll(async (): Promise<void> => {
    const { unit } = await TestBed.solitary(ExampleService).compile();

    service = unit;
  });

  it("should be defined", (): void => {
    expect(service).toBeDefined();
  });

  describe("Success cases", (): void => {
    it('should return "Hello World"', (): void => {
      expect(service.hello()).toBe("Hello World");
    });
  });
});
