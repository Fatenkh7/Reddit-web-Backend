import { User } from "../../entities/User";
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
    const { email, password, firstName, lastName, age, phone } = req.body;
    const profileUrl: string | null = req.files['profileUrl'] ? req.files['profileUrl'][0].path : null;

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
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.phone = phone;
    user.profileUrl = profileUrl;

    // Validate user
    const errors = await validate(user);
    if (errors.length > 0) {
        return res.status(400).send({ status: "400", message: "Invalid user data", errors });
    }

    try {
        const result = await userRepository.save(user);
        console.log(profileUrl, "prof")
        console.log(result, "user")

        // Delete previous image if it exists
        if (existingUser && existingUser.profileUrl) {
            const imagePath = `upload/${existingUser.profileUrl}`;
            fs.unlinkSync(imagePath);
        }

        return res.status(200).send({ status: "200", data: result });
    } catch (error) {
        return res.status(500).send({ status: "500", message: "Failed to save user", error });
    }
}


export async function editById(req: Request, res: Response) {
    let { id } = req.params;
    let profileUrl: any = req.files['profileUrl'] ? req.files['profileUrl'][0].path : null;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(id) });

        if (!user) {
            return res.status(404).json({ status: "404", message: "User not found" });
        }

        // Delete previous image file
        if (profileUrl && user.profileUrl) {
            const filePath = user.profileUrl.replace(/\\/g, '/'); // Replace backslashes with forward slashes
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
    const profileUrl = req.files['profileUrl'] ? req.files['profileUrl'][0].path : null;

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
            if (profileUrl) {
                fs.unlink(profileUrl, (err) => {
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
