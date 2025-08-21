import { Controller } from "@nestjs/common";
import { EventsService } from "@/modules/events/events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
}
