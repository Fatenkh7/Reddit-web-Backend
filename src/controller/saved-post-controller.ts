import { SavedPost } from "../../entities/SavedPost";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from '../../entities/User';
import { Post } from "../../entities/Post";


export async function getAll(req: Request, res: Response) {
    try {
        const savedpost = await AppDataSource.getRepository(SavedPost).find()
        if (!savedpost) {
            return res.status(404).send({ status: "404", message: "Saved posters are not found" });
        } else {
            return res.status(200).send({ status: "200", data: savedpost });
        }
    }
    catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(SavedPost).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "Saved post is not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function addSavedPost(req: Request, res: Response) {
    const { user_id, post_id } = req.body;
    try {
        const savedPostRepository = AppDataSource.getRepository(SavedPost);
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        const newSavedPost = new SavedPost();

        const user = await userRepository.findOneBy({ id: user_id });
        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }
        newSavedPost.userId = user_id;

        const post = await postRepository.findOneBy({ id: post_id });
        if (!post) {
            return res.status(404).json({ status: "404", message: "Post not found" });
        }
        newSavedPost.postId = post_id;

        const savedPost = await savedPostRepository.save(newSavedPost);

        if (!savedPost) {
            return res.status(401).json({ status: "401", message: "Saved post save failed" });
        } else {
            return res.status(201).json({ status: "201", message: "Saved post successfully", data: savedPost });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const savedPostRepository = AppDataSource.getRepository(SavedPost);

        const savedPost = await savedPostRepository.findOneBy({ id: parseInt(id) });
        if (!savedPost) {
            return res.status(404).json({ status: "404", message: "post is not found in the saved" });
        }

        savedPostRepository.merge(savedPost, req.body);

        const newSavedVote = await savedPostRepository.save(savedPost);

        if (!newSavedVote) {
            return res.status(401).json({ status: "401", message: "Post save failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Post saved successfully", data: newSavedVote });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const savedPostRepository = AppDataSource.getRepository(SavedPost);

        const savedPost = await savedPostRepository.findOneBy({ id: parseInt(id) });
        if (!savedPost) {
            return res.status(404).json({ status: "404", message: "Post is not found in the saved" });
        }

        const result = await savedPostRepository.remove(savedPost);

        if (!result) {
            return res.status(401).json({ status: "401", message: "Can't remove this Post" });
        } else {
            return res.status(200).json({ status: "200", message: "Unsaved post successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export default { getAll, getById, addSavedPost, editById, deleteById };
