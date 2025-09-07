import fs from "node:fs";
import path from "node:path";

import tsJest from "ts-jest";

const configuration = {
  rootDir: "src",
  testEnvironment: "node",
  testRegex: String.raw`.*\.spec\.ts$`,
  transform: {
    "^.+\\.(t|j)s$": [
      "@swc/jest",
      {
        ...JSON.parse(fs.readFileSync(path.resolve(".swcrc"), "utf8"))
      }
    ]
  },
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: tsJest.pathsToModuleNameMapper(
    JSON.parse(fs.readFileSync(path.resolve("tsconfig.json"), "utf8")).compilerOptions.paths,
    {
      prefix: path.resolve()
    }
  ),
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverages/unit",
  verbose: true
};

export default configuration;
