import {Router} from "express";
import {createSong, getSong, getSongs} from '../controllers/songs.js';

const router = Router();

router.get('/', getSongs);
router.post('/', createSong);
router.get('/:songId', getSong);

export default router;