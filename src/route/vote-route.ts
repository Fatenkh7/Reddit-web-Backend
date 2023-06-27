import * as express from "express"
import { addVote, deleteById, editById, getAll, getById } from "../controller/vote-controller";
const router = express.Router();


router.get("/all", getAll)
router.post("/add", addVote)
router.get("/:id", getById)
router.put("/:id", editById)
router.delete("/:id", deleteById)

export default router;