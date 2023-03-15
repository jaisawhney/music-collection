import {Router} from "express";
import {createSong, refreshSongs, getSong, getSongs} from '../controllers/songs.js';

const router = Router();

router.get('/', getSongs);
router.post('/', createSong);
router.get('/:songId', getSong);
router.post('/refresh', refreshSongs);

export default router;