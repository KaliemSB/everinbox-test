import { Module } from "@nestjs/common";
import { EventsModule } from "@/modules/events/events.module";

@Module({
  imports: [EventsModule],
})
export class AppModule {}
