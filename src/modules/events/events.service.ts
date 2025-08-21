import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "@/database/entities/event.entity";
import type { EventDto, EventResponseDto } from "./dto/events.dto";

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvents(eventsData: EventDto[]): Promise<EventResponseDto> {
    let processed = 0;
    let duplicates = 0;
    const errors: string[] = [];

    for (const eventDto of eventsData) {
      try {
        const existingEvent = await this.eventRepository.findOne({
          where: { id: eventDto.id },
        });

        if (existingEvent) {
          duplicates++;
          continue;
        }

        const event = this.eventRepository.create({
          ...eventDto,
          timestamp: new Date(eventDto.timestamp),
        });

        await this.eventRepository.save(event);
        processed++;

        this.logger.log(`Event ${eventDto.id} processed successfully`);
      } catch (error) {
        this.logger.error(`Failed to process event ${eventDto.id}:`, error);
        errors.push(
          `Event ${eventDto.id}: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }

    return {
      processed,
      duplicates,
      errors,
    };
  }
}
