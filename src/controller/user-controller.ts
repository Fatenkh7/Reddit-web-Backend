import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { hash } from 'bcrypt';
import { validate } from 'class-validator';
import { FindOperator } from 'typeorm';
import fs from 'fs';
import { error } from "console";


export async function getAll(req: Request, res: Response) {
    try {
        const users = await AppDataSource.getRepository(User).find()
        if (!users) {
            return res.status(404).send({ status: "404", message: "User not found" });
        } else {
            return res.status(200).send({ status: "200", data: users });
        }
    }
    catch (error) {
        return res.status(400).send("Something wrong");
    }
}

export async function getById(req: Request, res: Response) {
    let { id } = req.params;
    try {
        const result = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(id) });
        if (!result) {
            return res.status(404).send({ status: "404", message: "User not found" });
        } else {
            return res.status(200).send({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).send({ status: "400", message: "Something wrong" });
    }
}

export async function addUser(req: Request, res: Response) {
    const { email, password, first_name, last_name, age, phone } = req.body;
    const profile_url: string | null = req.files['profile_url'] ? req.files['profile_url'][0].path : null;

    // Check if email already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
        where: { email: email as FindOperator<string> },
    });

    if (existingUser) {
        return res.status(409).send({ status: "409", message: "Email already exists" });
    }

    // Create user
    const user = new User();
    user.email = email;
    user.password = await hash(password, 10);
    user.first_name = first_name;
    user.last_name = last_name;
    user.age = age;
    user.phone = phone;
    user.profile_url = profile_url;

    // Validate user
    const errors = await validate(user);
    if (errors.length > 0) {
        return res.status(400).send({ status: "400", message: "Invalid user data", errors });
    }

    try {
        const result = await userRepository.save(user);
        console.log(profile_url, "prof")
        console.log(result, "user")

        // Delete previous image if it exists
        if (existingUser && existingUser.profile_url) {
            const imagePath = `upload/${existingUser.profile_url}`;
            fs.unlinkSync(imagePath);
        }

        return res.status(200).send({ status: "200", data: result });
    } catch (error) {
        return res.status(500).send({ status: "500", message: "Failed to save user", error });
    }
}


export async function editById(req: Request, res: Response) {
    let { id } = req.params;
    let profile_url: any = req.files['profile_url'] ? req.files['profile_url'][0].path : null;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }

        // Delete previous image file
        if (profile_url && user.profile_url) {
            const filePath = user.profile_url.replace(/\\/g, '/'); // Replace backslashes with forward slashes
            fs.unlinkSync(filePath);
        }

        userRepository.merge(user, req.body);
        const result = await userRepository.save(user);

        if (!result) {
            return res.status(402).json({ status: "402", message: "Edit user failed!" });
        } else {
            return res.status(200).json({ status: "200", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: error.message });
    }
}

export async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    const profile_url = req.files['profile_url'] ? req.files['profile_url'][0].path : null;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }

        const result = await userRepository.remove(user);

        if (!result) {
            return res.status(402).json({ status: "402", message: "Delete user failed" });
        } else {
            // Delete user profile image if it exists
            if (profile_url) {
                fs.unlink(profile_url, (err) => {
                    if (err) {
                        console.error('Error deleting user profile image:', err);
                    }
                });
            }

            return res.status(200).json({ status: "200", message: "Delete user successfully", data: result });
        }
    } catch (error) {
        return res.status(400).json({ status: "400", message: "Something went wrong" });
    }
}

export default { getAll, getById, addUser, editById, deleteById };
