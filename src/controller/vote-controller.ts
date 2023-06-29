import { Vote } from "../../entities/Vote";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from '../../entities/User';
import { Post } from "../../entities/Post";
import { Comment } from "../../entities/Comment";


export async function getAll(req: Request, res: Response) {
    try {
        const vote = await AppDataSource.getRepository(Vote).find()
        if (!vote) {
            return res.status(404).send({ status: "404", message: "Votes not found" });
        } else {
            return res.status(200).send({ status: "200", data: vote });
        }
    }
    catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(Vote).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "Vote not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function addVote(req: Request, res: Response) {
    const { vote, user_id, post_id, comment_id } = req.body;
    try {
        const voteRepository = AppDataSource.getRepository(Vote);
        const commentRepository = AppDataSource.getRepository(Comment);
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        const newVote = new Vote();
        newVote.vote = vote;

        const user = await userRepository.findOneBy({ id: user_id });
        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }
        newVote.userId = user_id;

        const post = await postRepository.findOneBy({ id: post_id });
        if (!post) {
            return res.status(404).json({ status: "404", message: "Post not found" });
        }
        newVote.postId = post_id;

        const comment = await commentRepository.findOneBy({ id: comment_id });
        if (!comment) {
            return res.status(404).json({ status: "404", message: "comment not found" });
        }
        newVote.commentId = comment_id;

        const savedVote = await voteRepository.save(newVote);

        if (!savedVote) {
            return res.status(401).json({ status: "401", message: "Vote save failed" });
        } else {
            return res.status(201).json({ status: "201", message: "Vote added successfully", data: savedVote });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const voteRepository = AppDataSource.getRepository(Vote);

        const vote = await voteRepository.findOneBy({ id: parseInt(id) });
        if (!vote) {
            return res.status(404).json({ status: "404", message: "Vote not found" });
        }

        voteRepository.merge(vote, req.body);

        const savedVote = await voteRepository.save(vote);

        if (!savedVote) {
            return res.status(401).json({ status: "401", message: "Vote save failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Vote updated successfully", data: savedVote });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const voteRepository = AppDataSource.getRepository(Vote);

        const vote = await voteRepository.findOneBy({ id: parseInt(id) });
        if (!vote) {
            return res.status(404).json({ status: "404", message: "vote not found" });
        }

        const result = await voteRepository.remove(vote);

        if (!result) {
            return res.status(401).json({ status: "401", message: "vote delete failed" });
        } else {
            return res.status(200).json({ status: "200", message: "vote deleted successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error });
    }
}

export default { getAll, getById, addVote, editById, deleteById };
