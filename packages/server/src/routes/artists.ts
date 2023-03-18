import { Router } from 'express';
import { getArtist, getArtists } from '../controllers/artists.js';

const router = Router();

router.get('/', getArtists);
router.get('/:albumId', getArtist);

export default router;