import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { IsUrl } from "class-validator";
import { Post } from "./Post";

enum MediaType {
    Video = "video",
    Image = "image",
}

@Entity({ name: "media" })
export class Media {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: MediaType })
    type: MediaType;

    @Column("text")
    @IsUrl()
    path: string

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Post, post => post.media)
    posts: Post[]
}
