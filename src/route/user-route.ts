import * as express from "express"
const router = express.Router();

import { addUser, deleteById, editById, getAll, getById } from "../controller/user-controller"
import { imageHandler } from "../service/FileUploadService";


router.get("/all", getAll)
router.post("/add", imageHandler, addUser)
router.get("/:id", getById)
router.put("/:id", imageHandler, editById)
router.delete("/:id", imageHandler, deleteById)

export default router;