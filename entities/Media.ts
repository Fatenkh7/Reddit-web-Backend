import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("post_id", ["postId"], {})
@Entity("media", { schema: "reddit" })
export class Media {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "path" })
  path: string;

  @Column("enum", { name: "type", enum: ["video", "image"] })
  type: "video" | "image";

  @Column("int", { name: "post_id" })
  postId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
