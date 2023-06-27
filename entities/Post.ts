import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_52378a74ae3724bcab44036645b", ["userId"], {})
@Index("FK_049edb1ce7ab3d2a98009b171d0", ["mediaId"], {})
@Entity("post", { schema: "reddit" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "media_id", nullable: true })
  mediaId: number | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;
}
