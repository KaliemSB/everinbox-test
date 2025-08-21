import { Controller, Get, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { ApiKeyGuard } from "@/auth/api-key.guard";
import type { DailyStatsDto } from "./dto/stats.dto";

@Controller("stats")
@UseGuards(ApiKeyGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("daily")
  async getDailyStats(): Promise<DailyStatsDto[]> {
    return this.statsService.getDailyStats();
  }
}
