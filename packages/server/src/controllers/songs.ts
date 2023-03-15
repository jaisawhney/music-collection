import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { syncMedia } from '../utils/music.js';

const prisma = new PrismaClient();


export async function createSong(req: Request, res: Response) {
    res.status(200);
}

export async function getSong(req: Request, res: Response) {
    const id: number = parseInt(req.params.songId);
    const song = await prisma.song.findUnique({
        where: {
            id: id,
        },
        select: { id: true, mediaHash: true, track: true, title: true, artistId: true, albumId: true },
    });
    res.status(200).json(song);
}

export async function getSongs(req: Request, res: Response) {
    const songs = await prisma.song.findMany({
        select: { id: true, mediaHash: true, track: true, title: true, artistId: true, albumId: true },
    });
    res.status(200).json(songs);
}

export async function updateSong(req: Request, res: Response) {
    res.status(200);
}

export async function deleteSong(req: Request, res: Response) {
    res.status(200);
}

export function refreshSongs(req: Request, res: Response) {
    syncMedia()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
}
