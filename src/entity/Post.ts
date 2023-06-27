import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"
import { Media } from "./Media"
import { Vote } from "./Vote"
import { SavedPost } from "./Saved-Post"

@Entity({ name: "post" })
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    title: string

    @Column("text")
    content: string

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToOne(() => Media, media => media.posts)
    @JoinColumn({ name: "media_id" })
    media: Media;

    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[];

    @OneToMany(() => SavedPost, saved_post => saved_post.post)
    saved_posts: SavedPost[];


}
