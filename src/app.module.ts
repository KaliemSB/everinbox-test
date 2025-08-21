import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsModule } from "@/modules/events/events.module";
import { StatsModule } from "@/modules/stats/stats.module";
import { HealthModule } from "@/health/health.module";
import { databaseConfig } from "@/database/database.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EventsModule,
    StatsModule,
    HealthModule,
  ],
})
export class AppModule {}
