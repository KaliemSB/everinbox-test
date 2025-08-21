import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { EventsService } from "@/modules/events/events.service";
import { ApiKeyGuard } from "@/auth/api-key.guard";
import { CreateEventsDto, EventResponseDto } from "./dto/events.dto";

@Controller("events")
@UseGuards(ApiKeyGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEvents(
    @Body() createEventsDto: CreateEventsDto,
  ): Promise<EventResponseDto> {
    return this.eventsService.createEvents(createEventsDto.events);
  }
}
