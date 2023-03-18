import { Router } from 'express';
import { getAlbum, getAlbums, getAlbumSongs } from '../controllers/albums.js';

const router = Router();

router.get('/', getAlbums);
router.get('/:albumId', getAlbum);
router.get('/:albumId/songs', getAlbumSongs);

export default router;