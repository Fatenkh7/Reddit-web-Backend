import { Topic } from "../entity/Topic";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";


export async function getAll(req: Request, res: Response) {
    try {
        const topic = await AppDataSource.getRepository(Topic).find()
        if (!topic) {
            return res.status(404).send({ status: "404", message: "Their is no topics" });
        } else {
            return res.status(200).send({ status: "200", data: topic });
        }
    }
    catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(Topic).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "Topic not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function addTopic(req: Request, res: Response) {
    const { title, description } = req.body;
    try {
        const topicRepository = AppDataSource.getRepository(Topic);

        const newTopic = new Topic();
        newTopic.title = title;
        newTopic.description = description;

        const savedTopic = await topicRepository.save(newTopic);

        if (!savedTopic) {
            return res.status(401).json({ status: "401", message: "Topic save failed" });
        } else {
            return res.status(201).json({ status: "201", message: "Topic added successfully", data: savedTopic });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const topicRepository = AppDataSource.getRepository(Topic)

        const topic = await topicRepository.findOneBy({ id: parseInt(id) });
        if (!topic) {
            return res.status(404).json({ status: "404", message: "topic not found" });
        }

        topicRepository.merge(topic, req.body);

        const savedTopic = await topicRepository.save(topic);

        if (!savedTopic) {
            return res.status(401).json({ status: "401", message: "topic save failed" });
        } else {
            return res.status(200).json({ status: "200", message: "topic updated successfully", data: savedTopic });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const topicRepository = AppDataSource.getRepository(Topic)

        const topic = await topicRepository.findOneBy({ id: parseInt(id) });
        if (!topic) {
            return res.status(404).json({ status: "404", message: "Topic not found" });
        }

        const result = await topicRepository.remove(topic);

        if (!result) {
            return res.status(401).json({ status: "401", message: "Topic delete failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Topic deleted successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export default { getAll, getById, addTopic, editById, deleteById };
