import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Subscription } from "./Subscription";


@Entity({ name: "topic" })
export class Topic {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    title: string

    @Column("text")
    description: string

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @OneToMany(() => Subscription, subscription => subscription.topic)
    subscriptions: Subscription[]
}
