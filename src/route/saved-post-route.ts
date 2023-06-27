import * as express from "express"
import { addSavedPost, deleteById, editById, getAll, getById } from "../controller/saved-post-controller";
const router = express.Router();


router.get("/all", getAll)
router.post("/add", addSavedPost)
router.get("/:id", getById)
router.put("/:id", editById)
router.delete("/:id", deleteById)

export default router;