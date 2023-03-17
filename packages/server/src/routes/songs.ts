import {Router} from "express";
import { getSong, getSongs} from '../controllers/songs.js';

const router = Router();

router.get('/', getSongs);
router.get('/:songId', getSong);

export default router;