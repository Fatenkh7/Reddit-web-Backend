import * as express from "express"
import { addSubscription, deleteById, editById, getAll, getById } from "../controller/subscription-controller";
const router = express.Router();


router.get("/all", getAll)
router.post("/add", addSubscription)
router.get("/:id", getById)
router.put("/:id", editById)
router.delete("/:id", deleteById)

export default router;