import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    migrations: [],
    subscribers: [],
})

