export interface FileOptions {
  readonly level: string;
  readonly skipLevels?: string[];
  readonly skipContexts?: string[];
  readonly json?: boolean;
  readonly dirname: string;
  readonly maxFiles: string;
  readonly maxSize: string;
  readonly auditHashType?: string;
}
