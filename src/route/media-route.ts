import * as express from "express"
const router = express.Router();

import { addMedia, deleteById, editById, getAll, getById } from "../controller/media-controller"
import { imageHandler } from "../service/FileUploadService";


router.get("/all", getAll)
router.post("/add", imageHandler, addMedia)
router.get("/:id", getById)
router.put("/:id", imageHandler, editById)
router.delete("/:id", deleteById)

export default router;