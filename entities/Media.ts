import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("media", { schema: "reddit" })
export class Media {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "path" })
  path: string;

  @Column("enum", { name: "type", enum: ["video", "image"] })
  type: "video" | "image";

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;
}
