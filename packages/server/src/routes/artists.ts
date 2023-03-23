import { Router } from 'express';
import { getArtist, getArtistAlbums, getArtists } from '../controllers/artists.js';

const router = Router();

router.get('/', getArtists);
router.get('/:albumId', getArtist);
router.get('/:albumId/albums', getArtistAlbums)

export default router;