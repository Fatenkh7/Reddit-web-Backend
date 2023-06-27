import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { IsOptional, IsUrl } from "class-validator";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Vote } from "./Vote";
import { Subscription } from "./Subscription";
import { SavedPost } from "./Saved-Post";

enum GenderType {
    Male = "male",
    Female = "female",
}

@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    first_name: string

    @Column("text")
    last_name: string

    @Column({
        length: 2,
    })
    age: string

    @Column("text")
    email: string

    @Column("text")
    password: string

    @Column("text")
    phone: string

    @Column({ type: "enum", enum: GenderType })
    gender: GenderType;

    @Column("text", { nullable: true })
    @IsOptional()
    profile_url: string | null;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Vote, vote => vote.user)
    votes: Vote[];

    @OneToMany(() => Subscription, subscription => subscription.user)
    subscriptions: Subscription[];

    @OneToMany(() => SavedPost, saved_post => saved_post.user)
    saved_posts: SavedPost[];
}
