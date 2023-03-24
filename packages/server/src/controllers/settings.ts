import { Request, Response } from 'express';
import { syncMedia } from '../utils/music.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSettings(req: Request, res: Response) {
    const settings = await prisma.setting.findMany();
    res.status(200).json(settings);
}

export async function updateSettings(req: Request, res: Response) {
    try {
        // const settings = req.body?.settings;
        // if (!settings) return res.sendStatus(400);

        //TODO: Implement

        await syncMedia();
        res.status(201).json({ 'msg': 'Refreshed the library' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'msg': 'Internal Error' });
    }
}
