import {Router} from "express";
import {musicStream} from "../controllers/stream.js";
const router = Router();

router.get('/:mediaHash', musicStream);

export default router;