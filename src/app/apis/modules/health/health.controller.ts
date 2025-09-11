import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  MemoryHealthIndicator
} from "@nestjs/terminus";

import os from "node:os";

@Controller()
export class HealthController {
  private readonly disk: DiskHealthIndicator;
  private readonly health: HealthCheckService;
  private readonly memory: MemoryHealthIndicator;

  public constructor(disk: DiskHealthIndicator, health: HealthCheckService, memory: MemoryHealthIndicator) {
    this.disk = disk;
    this.health = health;
    this.memory = memory;
  }

  @Get("system")
  @HttpCode(HttpStatus.OK)
  @HealthCheck({ swaggerDocumentation: true })
  public system(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.disk.checkStorage("disk", {
          path: os.platform() === "win32" ? "C:\\" : "/",
          thresholdPercent: 2
        }),
      (): Promise<HealthIndicatorResult> => this.memory.checkHeap("heap", 150 * 1024 * 1024),
      (): Promise<HealthIndicatorResult> => this.memory.checkRSS("rss", 300 * 1024 * 1024)
    ]);
  }
}
