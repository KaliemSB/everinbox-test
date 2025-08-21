import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsObject,
  IsIn,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import type { EventType } from "@/database/entities/event.entity";

export class EventDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsIn(["sent", "open", "click"])
  type: EventType;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  site: string;

  @IsDateString()
  timestamp: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateEventsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events: EventDto[];
}

export class EventResponseDto {
  processed: number;
  duplicates: number;
  errors: string[];
}
