import * as express from "express"
import { addTopic, deleteById, editById, getAll, getById } from "../controller/topic-controller";
const router = express.Router();


router.get("/all", getAll)
router.post("/add", addTopic)
router.get("/:id", getById)
router.put("/:id", editById)
router.delete("/:id", deleteById)

export default router;