import { Router } from 'express';
import { getAlbum, getAlbums } from '../controllers/albums.js';

const router = Router();

router.get('/', getAlbums);
router.get('/:albumId', getAlbum);

export default router;