import * as express from "express"
import { addComment, deleteById, editById, getAll, getById } from "../controller/comment-controller";
const router = express.Router();


router.get("/all", getAll)
router.post("/add", addComment)
router.get("/:id", getById)
router.put("/:id", editById)
router.delete("/:id", deleteById)

export default router;