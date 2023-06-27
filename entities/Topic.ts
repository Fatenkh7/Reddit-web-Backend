import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("topic", { schema: "reddit" })
export class Topic {
  @Column("text", { name: "description" })
  description: string;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

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
