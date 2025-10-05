import { FormatException } from "./exceptions";
import { FormatTransformers } from "./interfaces";
import { FormatArgs, TransformersArg } from "./types";

import { StringUtil } from "./string.util";

interface FormatTestCase {
  name: string;
  template: string;
  args: FormatArgs;
  transformer?: FormatTransformers;
  expected: string;
}

describe("StringUtil (Unit)", (): void => {
  it("should be defined", (): void => {
    expect(StringUtil).toBeDefined();
  });

  describe("Success cases", (): void => {
    it.each<FormatTestCase>([
      {
        name: "should formats a string with a single positional placeholder",
        template: "Hello {0}",
        args: ["World"],
        expected: "Hello World"
      },
      {
        name: "should formats a string with multiple positional placeholders",
        template: "{0} + {1} = {2}",
        args: ["1", "2", "3"],
        expected: "1 + 2 = 3"
      },
      {
        name: "should formats a string using named placeholders",
        template: "My name is {name}",
        args: [{ name: "John" }],
        expected: "My name is John"
      },
      {
        name: "should formats a string with object property access in placeholders",
        template: "My name is {0.name} and my best friend's name is {1.name}",
        args: [{ name: "John" }, { name: "Doe" }],
        expected: "My name is John and my best friend's name is Doe"
      },
      {
        name: "should returns the original string when no placeholders are present",
        template: "Just text",
        args: [{}],
        expected: "Just text"
      },
      {
        name: "should replaces missing positional arguments with empty strings",
        template: "Hello {0}, Welcome to {1}",
        args: ["World"],
        expected: "Hello World, Welcome to "
      },
      {
        name: "should applies a custom transformer to a placeholder",
        template: "Hello {0!upper}",
        args: ["world"],
        transformer: {
          upper: (arg: TransformersArg): string => String(arg).toUpperCase()
        },
        expected: "Hello WORLD"
      },
      {
        name: "should formats a string with positional placeholders using empty transformers object",
        template: "Hello {0}",
        args: ["World"],
        transformer: {},
        expected: "Hello World"
      },
      {
        name: "should formats a string with positional placeholder when transformers is undefined",
        template: "Hello {0}",
        args: ["World"],
        transformer: undefined,
        expected: "Hello World"
      }
    ])("$name", ({ args, template, expected, transformer }): void => {
      expect(StringUtil.format(template, args, transformer)).toBe(expected);
    });
  });

  describe("Exception cases", (): void => {
    it("should throws FormatException when a placeholder is malformed", (): void => {
      expect((): string => StringUtil.format("{} + {0} = {1}", ["1", "2", "3"])).toThrow(FormatException);
    });

    it("should throws FormatException when a referenced transformer is missing", (): void => {
      expect((): string => StringUtil.format("{!missing}", ["world"])).toThrow(FormatException);
    });

    it("should throws FormatException when a transformer throws an error", (): void => {
      expect((): string =>
        StringUtil.format("Fail here {0!fail}", ["test"], {
          fail: (_arg: TransformersArg): string => {
            throw new Error("Transformer failed");
          }
        })
      ).toThrow(FormatException);
    });
  });
});
