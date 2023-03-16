import { Router } from 'express';
import songs from "./songs.js";
import stream from "./stream.js";
import albums from './albums.js';

const router = Router();

router.use('/songs', songs);
router.use('/albums', albums);
router.use('/stream', stream);

export default router;