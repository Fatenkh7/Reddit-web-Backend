import { Subscription } from "../../entities/Subscription";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from '../../entities/User';
import { Topic } from "../../entities/Topic";


export async function getAll(req: Request, res: Response) {
    try {
        const subscription = await AppDataSource.getRepository(Subscription).find()
        if (!subscription) {
            return res.status(404).send({ status: "404", message: "Subscription not found" });
        } else {
            return res.status(200).send({ status: "200", data: subscription });
        }
    }
    catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(Subscription).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "Subscription is not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function addSubscription(req: Request, res: Response) {
    const { user_id, topic_id } = req.body;
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);
        const topicRepository = AppDataSource.getRepository(Topic);
        const userRepository = AppDataSource.getRepository(User);

        const newsubscription = new Subscription();

        const user = await userRepository.findOneBy({ id: user_id });
        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }
        newsubscription.userId = user_id;

        const topic = await topicRepository.findOneBy({ id: topic_id });
        if (!topic) {
            return res.status(404).json({ status: "404", message: "Topic is not found" });
        }
        newsubscription.topicId = topic_id;

        const savedSubscrib = await subscriptionRepository.save(newsubscription);

        if (!savedSubscrib) {
            return res.status(401).json({ status: "401", message: "Subscription save failed" });
        } else {
            return res.status(201).json({ status: "201", message: "Subscription added successfully", data: savedSubscrib });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);

        const subscription = await subscriptionRepository.findOneBy({ id: parseInt(id) });
        if (!subscription) {
            return res.status(404).json({ status: "404", message: "Subscription not found" });
        }

        subscriptionRepository.merge(subscription, req.body);

        const savedSubscription = await subscriptionRepository.save(subscription);

        if (!savedSubscription) {
            return res.status(401).json({ status: "401", message: "Subscription save failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Subscription updated successfully", data: savedSubscription });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const subscriptionRepository = AppDataSource.getRepository(Subscription);

        const subscription = await subscriptionRepository.findOneBy({ id: parseInt(id) });
        if (!subscription) {
            return res.status(404).json({ status: "404", message: "Subscription not found" });
        }

        const result = await subscriptionRepository.remove(subscription);

        if (!result) {
            return res.status(401).json({ status: "401", message: "Subscription delete failed" });
        } else {
            return res.status(200).json({ status: "200", message: "Subscription deleted successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong", error: error.message });
    }
}

export default { getAll, getById, addSubscription, editById, deleteById };
