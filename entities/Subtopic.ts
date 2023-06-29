import { Column, Entity, Index } from "typeorm";

@Index("topic_id", ["topicId"], {})
@Entity("subtopic", { schema: "reddit" })
export class Subtopic {
  @Column("int", { name: "id" })
  id: number;

  @Column("int", { name: "topic_id" })
  topicId: number;

  @Column("text", { name: "name" })
  name: string;
}
