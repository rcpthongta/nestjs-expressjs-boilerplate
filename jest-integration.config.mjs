import fs from "node:fs";
import path from "node:path";

import tsJest from "ts-jest";

const configuration = {
  rootDir: "src",
  testEnvironment: "node",
  testRegex: String.raw`.*\.(int|integration)-spec\.ts$`,
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
  coverageDirectory: "../coverages/integration",
  verbose: true
};

export default configuration;
