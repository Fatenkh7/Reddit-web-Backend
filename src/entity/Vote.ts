import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";

enum VoteType {
    UpVotes = "upvotes",
    DownVotes = "downvotes",
}

@Entity({ name: "vote" })
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: VoteType })
    vote: VoteType;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.votes)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Post, post => post.votes)
    @JoinColumn({ name: "post_id" })
    post: Post;

    @ManyToOne(() => Comment, comment => comment.votes)
    @JoinColumn({ name: "comment_id" })
    comment: Comment;
}
