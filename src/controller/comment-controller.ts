import { Comment } from "../../entities/Comment";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from '../../entities/User';
import { Post } from "../../entities/Post";


export async function getAll(req: Request, res: Response) {
    try {
        const comments = await AppDataSource.getRepository(Comment).find()
        if (!comments) {
            return res.status(404).send({ status: "404", message: "Comments not found" });
        } else {
            return res.status(200).send({ status: "200", data: comments });
        }
    }
    catch (error) {
        return res.status(400).send("Something wrong");
    }
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(Comment).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "Comment not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).send({ status: "400", message: "Something wrong" });
    }
}

export async function addComment(req: Request, res: Response) {
    const { comment, user_id, post_id } = req.body;
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        const newComment = new Comment();
        newComment.comment = comment;

        const user = await userRepository.findOneBy({ id: user_id });
        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }
        newComment.userId = user_id;

        const post = await postRepository.findOneBy({ id: post_id });
        if (!post) {
            return res.status(404).json({ status: "404", message: "Post not found" });
        }
        newComment.postId = post_id;

        const savedComment = await commentRepository.save(newComment);

        if (!savedComment) {
            return res.status(401).json({ status: "401", message: "Comment save failed" });
        } else {
            return res.status(201).json({ status: "201", message: "Comment added successfully", data: savedComment });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const commentRepository = AppDataSource.getRepository(Comment);

        const comment = await commentRepository.findOneBy({ id: parseInt(id) });
        if (!comment) {
            return res.status(404).json({ status: "404", message: "Comment not found" });
        }

        commentRepository.merge(comment, req.body);

        const savedComment = await commentRepository.save(comment);

        if (!savedComment) {
            return res.status(401).json({ status: "401", message: "Comment save failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Post updated successfully", data: savedComment });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const commentRepository = AppDataSource.getRepository(Comment);

        const comment = await commentRepository.findOneBy({ id: parseInt(id) });
        if (!comment) {
            return res.status(404).json({ status: "404", message: "Comment not found" });
        }

        const result = await commentRepository.remove(comment);

        if (!result) {
            return res.status(401).json({ status: "401", message: "Comment delete failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Comment deleted successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error });
    }
}

export default { getAll, getById, addComment, editById, deleteById };
