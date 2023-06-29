import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_af8728cf605f1988d2007d094f5", ["userId"], {})
@Index("FK_b284a674ec7d4e6cf374467a8c8", ["commentId"], {})
@Index("FK_b7f5b42bfe9b12e0cf1de3290e4", ["postId"], {})
@Entity("vote", { schema: "reddit" })
export class Vote {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "post_id", nullable: true })
  postId: number | null;

  @Column("int", { name: "comment_id", nullable: true })
  commentId: number | null;

  @Column("enum", { name: "vote", enum: ["upvotes", "downvotes"] })
  vote: "upvotes" | "downvotes";

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
