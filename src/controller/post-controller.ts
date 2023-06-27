import { Post } from "../entity/Post";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from '../entity/User';
import { Media } from "../entity/Media";


export async function getAll(req: Request, res: Response) {
    try {
        const posters = await AppDataSource.getRepository(Post).find()
        if (!posters) {
            return res.status(404).send({ status: "404", message: "Posters not found" });
        } else {
            return res.status(200).send({ status: "200", data: posters });
        }
    }
    catch (error) {
        return res.status(400).send("Something wrong");
    }
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(Post).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "Post not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).send({ status: "400", message: "Something wrong" });
    }
}

export async function addPost(req: Request, res: Response) {
    const { title, content, user_id, media_id } = req.body;
    try {
        const postRepository = AppDataSource.getRepository(Post);
        const userRepository = AppDataSource.getRepository(User);
        const mediaRepository = AppDataSource.getRepository(Media);

        const post = new Post();
        post.title = title;
        post.content = content;

        const user = await userRepository.findOneBy({ id: user_id });
        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }
        post.user = user;

        const media = await mediaRepository.findOneBy({ id: media_id });
        if (!media) {
            return res.status(404).json({ status: "404", message: "Media not found" });
        }
        post.media = media;

        const savedPost = await postRepository.save(post);

        if (!savedPost) {
            return res.status(401).json({ status: "401", message: "Post save failed" });
        } else {
            return res.status(201).json({ status: "201", message: "Post added successfully", data: savedPost });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const postRepository = AppDataSource.getRepository(Post);

        const post = await postRepository.findOneBy({ id: parseInt(id) });
        if (!post) {
            return res.status(404).json({ status: "404", message: "Post not found" });
        }

        postRepository.merge(post, req.body);

        const savedPost = await postRepository.save(post);

        if (!savedPost) {
            return res.status(401).json({ status: "401", message: "Post save failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Post updated successfully", data: savedPost });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const postRepository = AppDataSource.getRepository(Post);

        const post = await postRepository.findOneBy({ id: parseInt(id) });
        if (!post) {
            return res.status(404).json({ status: "404", message: "Post not found" });
        }

        const result = await postRepository.remove(post);

        if (!result) {
            return res.status(401).json({ status: "401", message: "Post delete failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Post deleted successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error });
    }
}

export default { getAll, getById, addPost, editById, deleteById };
