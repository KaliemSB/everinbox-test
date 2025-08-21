import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "@/database/entities/event.entity";
import type { DailyStatsDto } from "./dto/stats.dto";

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getDailyStats(): Promise<DailyStatsDto[]> {
    const query = `
      SELECT 
        DATE(timestamp) as date,
        site,
        COUNT(CASE WHEN type = 'sent' THEN 1 END) as sent,
        COUNT(CASE WHEN type = 'open' THEN 1 END) as opened,
        COUNT(CASE WHEN type = 'click' THEN 1 END) as clicked,
        CASE 
          WHEN COUNT(CASE WHEN type = 'sent' THEN 1 END) = 0 THEN 0
          ELSE ROUND(
            COUNT(CASE WHEN type = 'open' THEN 1 END)::decimal / 
            COUNT(CASE WHEN type = 'sent' THEN 1 END) * 100, 2
          )
        END as openRate,
        CASE 
          WHEN COUNT(CASE WHEN type = 'sent' THEN 1 END) = 0 THEN 0
          ELSE ROUND(
            COUNT(CASE WHEN type = 'click' THEN 1 END)::decimal / 
            COUNT(CASE WHEN type = 'sent' THEN 1 END) * 100, 2
          )
        END as clickRate
      FROM events 
      GROUP BY DATE(timestamp), site 
      ORDER BY date DESC, site ASC
    `;

    const results = await this.eventRepository.query(query);

    return results.map((row: any) => ({
      date: row.date,
      site: row.site,
      sent: parseInt(row.sent),
      opened: parseInt(row.opened),
      clicked: parseInt(row.clicked),
      openRate: parseFloat(row.openrate),
      clickRate: parseFloat(row.clickrate),
    }));
  }
}
