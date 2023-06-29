import { Column, Entity, Index } from "typeorm";

@Index("subtopic_id", ["subtopicId"], {})
@Index("topic_id", ["topicId"], {})
@Index("user_id", ["userId"], {})
@Entity("community", { schema: "reddit" })
export class Community {
  @Column("int", { name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("timestamp", {
    name: "creation_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  creationDate: Date;

  @Column("int", { name: "topic_id" })
  topicId: number;

  @Column("int", { name: "subtopic_id" })
  subtopicId: number;

  @Column("int", { name: "user_id" })
  userId: number;
}
