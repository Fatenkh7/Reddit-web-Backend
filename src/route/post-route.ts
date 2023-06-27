import * as express from "express"
import { addPost, deleteById, editById, getAll, getById } from "../controller/post-controller";
const router = express.Router();


router.get("/all", getAll)
router.post("/add", addPost)
router.get("/:id", getById)
router.put("/:id", editById)
router.delete("/:id", deleteById)

export default router;