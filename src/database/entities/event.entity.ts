import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export type EventType = "sent" | "open" | "click";

@Entity("events")
@Index(["site", "timestamp"])
@Index(["type", "timestamp"])
export class Event {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 20 })
  type: EventType;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  site: string;

  @Column({ type: "timestamptz" })
  timestamp: Date;

  @Column({ type: "jsonb", nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
