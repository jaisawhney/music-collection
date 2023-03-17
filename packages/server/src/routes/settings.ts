import {Router} from "express";
import { updateSettings } from '../controllers/settings.js';

const router = Router();

router.post('/', updateSettings);

export default router;