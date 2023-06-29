import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_667736eef71e667998427203476", ["postId"], {})
@Index("FK_7157d9273d704ecb2671bfb0720", ["userId"], {})
@Entity("saved_post", { schema: "reddit" })
export class SavedPost {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "post_id", nullable: true })
  postId: number | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("datetime", {
    name: "saved_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  savedAt: Date;
}
