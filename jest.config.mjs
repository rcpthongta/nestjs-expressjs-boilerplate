import fs from "node:fs";
import path from "node:path";

import tsJest from "ts-jest";

const configuration = {
  rootDir: "src",
  testEnvironment: "node",
  testRegex: String.raw`.*\.spec\.(js|ts)$`,
  transform: {
    "^.+\\.(js|ts)$": [
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
  clearMocks: true,
  testPathIgnorePatterns: ["\\.integration-spec\\.(js|ts)$"],
  collectCoverageFrom: ["**/*.(js|ts)"],
  coverageProvider: "v8",
  coveragePathIgnorePatterns: [
    "/environments/",
    "\\.integration-spec\\.(js|ts)$",
    "\\.configuration\\.(js|ts)$",
    "\\.constant\\.(js|ts)$",
    "\\.dto\\.(js|ts)$",
    "\\.exception\\.(js|ts)$",
    "\\.interface\\.(js|ts)$",
    "\\.module\\.(js|ts)$",
    "\\.type\\.(js|ts)$",
    "index\\.(js|ts)$",
    "main\\.(js|ts)$",
    "swagger\\.(js|ts)$"
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  coverageDirectory: "../coverages/unit",
  verbose: true
};

export default configuration;
