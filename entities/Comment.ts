import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_bbfe153fa60aa06483ed35ff4a7", ["userId"], {})
@Index("FK_8aa21186314ce53c5b61a0e8c93", ["postId"], {})
@Entity("comment", { schema: "reddit" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "comment" })
  comment: string;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "post_id", nullable: true })
  postId: number | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
