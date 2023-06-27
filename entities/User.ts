import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "reddit" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "profile_url", nullable: true })
  profileUrl: string | null;

  @Column("varchar", { name: "age", length: 2 })
  age: string;

  @Column("text", { name: "first_name" })
  firstName: string;

  @Column("text", { name: "last_name" })
  lastName: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("text", { name: "phone" })
  phone: string;

  @Column("enum", { name: "gender", enum: ["male", "female"] })
  gender: "male" | "female";
}
