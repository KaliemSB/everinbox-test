import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { Event } from "@/database/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
