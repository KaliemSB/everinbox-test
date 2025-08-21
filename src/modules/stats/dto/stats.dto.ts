export interface DailyStatsDto {
  date: string;
  site: string;
  sent: number;
  opened: number;
  clicked: number;
  openRate: number;
  clickRate: number;
}
