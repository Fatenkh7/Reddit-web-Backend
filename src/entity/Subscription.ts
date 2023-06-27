import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne,JoinColumn } from "typeorm"
import { Topic } from "./Topic";
import { User } from "./User";


@Entity({ name: "subscription" })
export class Subscription {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Topic, topic => topic.subscriptions)
    @JoinColumn({ name: "topic_id" })
    topic: Topic

    @ManyToOne(() => User, user => user.subscriptions)
    @JoinColumn({ name: "user_id" })
    user: User
}
