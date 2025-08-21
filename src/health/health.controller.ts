import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck("database")]);
  }

  @Get("ready")
  readiness() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }

  @Get("live")
  liveness() {
    return { status: "ok", timestamp: new Date().toISOString() };
  }
}
