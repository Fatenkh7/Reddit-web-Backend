import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"
import { Vote } from "./Vote"

@Entity({ name: "comment" })
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    comment: string

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn({ name: "post_id" })
    post: Post;

    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[];
}
