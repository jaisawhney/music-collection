import { Router } from 'express';
import songs from './songs.js';
import stream from './stream.js';
import albums from './albums.js';
import settings from './settings.js';
import artists from './artists.js';

const router = Router();

// TODO: Form/api validation
router.use('/songs', songs);
router.use('/albums', albums);
router.use('/artists', artists);
router.use('/stream', stream);
router.use('/settings', settings);

export default router;