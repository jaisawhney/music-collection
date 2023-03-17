import { Request, Response } from 'express';
import { syncMedia } from '../utils/music.js';

export function updateSettings(req: Request, res: Response) {
    //TODO: Implement proper settings
    syncMedia()
        .then(() => res.status(200).json({ 'msg': 'Refreshed the library' }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ 'msg': 'Internal Error' });
        });
}
