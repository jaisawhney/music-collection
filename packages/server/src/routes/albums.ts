import { Router } from 'express';
import { getAlbum, getAlbumCover, getAlbums, getAlbumSongs } from '../controllers/albums.js';

const router = Router();

router.get('/', getAlbums);
router.get('/:albumId', getAlbum);
router.get('/:albumId/songs', getAlbumSongs);
router.get('/:albumId/cover', getAlbumCover)

export default router;