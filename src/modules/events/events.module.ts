import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsController } from "@/modules/events/events.controller";
import { EventsService } from "@/modules/events/events.service";
import { Event } from "@/database/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
