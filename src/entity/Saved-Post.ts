import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity({ name: "saved_post" })
export class SavedPost {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.saved_posts)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Post, post => post.saved_posts)
    @JoinColumn({ name: "post_id" })
    post: Post;

    @CreateDateColumn()
    saved_at: Date;

}
