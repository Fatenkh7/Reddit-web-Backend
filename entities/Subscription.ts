import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_d6e43f97d21bc30bcc37a19eeb8", ["topicId"], {})
@Index("FK_940d49a105d50bbd616be540013", ["userId"], {})
@Entity("subscription", { schema: "reddit" })
export class Subscription {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "topic_id", nullable: true })
  topicId: number | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
