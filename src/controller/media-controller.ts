import { Media } from "../entity/Media";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import fs from 'fs';
import { validate } from 'class-validator';
import { FindOperator } from 'typeorm';


export async function getAll(req: Request, res: Response) {
    try {
        const media = await AppDataSource.getRepository(Media).find()
        if (!media) {
            return res.status(404).send({ status: "404", message: "There is no files" });
        } else {
            return res.status(200).send({ status: "200", data: media });
        }
    }
    catch (error) {
        return res.status(400).send("Something wrong");
    }
}

export async function getById(req: Request, res: Response) {
    let { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(Media).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "This file is not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).send({ status: "400", message: "Something wrong" });
    }
}


export async function addMedia(req: Request, res: Response) {
    try {
        const { type } = req.body;
        const { path } = req.files['path'][0];

        const mediaRepository = AppDataSource.getRepository(Media);

        const media = new Media();
        media.type = type;
        media.path = path;

        const savedMedia = await mediaRepository.save(media);

        if (!savedMedia) {
            fs.unlinkSync(path);
            return res.status(402).json({ status: "402", error: "Can't save this image!!" });
        } else {
            return res.status(201).json({ status: "201", message: "Add file successfully", data: savedMedia });
        }
    } catch (error) {
        res.status(400).json({ error: error.message, message: "Something went wrong!" });
    }
}


export async function editById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const mediaRepository = AppDataSource.getRepository(Media);
        const media = await mediaRepository.findOneBy({ id: parseInt(id) });

        if (!media) {
            return res.status(404).send({ status: "404", message: "This file is not found" });
        }

        // Delete previous image file
        if (media.path) {
            const filePath = media.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes
            fs.unlinkSync(filePath);
        }

        mediaRepository.merge(media, req.body);
        const result = await mediaRepository.save(media);

        if (!result) {
            return res.status(404).send({ status: "402", message: "Edit File failed!" });
        } else {
            return res.status(200).send({ status: "200", message: "Edit File done ", data: result });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
}


export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const mediaRepository = AppDataSource.getRepository(Media);
        const media = await mediaRepository.findOneBy({ id: parseInt(id) });
        if (!media) {
            return res.status(404).send({ status: "404", message: "This file not found" });
        }
        fs.unlink(media.path, (error) => {
            if (error) {
                return res.status(500).send({ status: "402", message: "Delete file failed", error });
            }
            mediaRepository.remove(media);
            return res.status(200).send({ status: "200", message: "Delete file successfully" });
        });
    } catch (error) {
        return res.status(400).send({ status: "400", message: "Something went wrong", error });
    }
}

export default { getAll, getById, addMedia, deleteById };
