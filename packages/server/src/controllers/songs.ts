import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSong(req: Request, res: Response) {
    const mediaHash: string = req.params.songId;
    const song = await prisma.song.findUnique({
        where: {
            mediaHash: mediaHash,
        },
        select: {
            id: true,
            mediaHash: true,
            track: true,
            title: true,
            artistId: true,
            albumId: true,
            duration: true,
            genre: true,
        },
    });
    res.status(200).json(song);
}

export async function getSongs(req: Request, res: Response) {
    const songs = await prisma.song.findMany({
        select: {
            id: true,
            mediaHash: true,
            track: true,
            title: true,
            artistId: true,
            albumId: true,
            duration: true,
            genre: true,
            artist: true, // Include nested resources to make life easier
            album: true,
        },
        orderBy: {
            albumId: 'asc',
        },
    });
    res.status(200).json(songs);
}