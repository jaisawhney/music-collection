import {Router} from 'express';
import songs from "./songs.js";
import stream from "./stream.js";

const router = Router();

router.use('/songs', songs);
router.use('/stream', stream);

export default router;