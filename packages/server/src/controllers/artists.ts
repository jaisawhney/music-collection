import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getArtist(req: Request, res: Response) {
    const id: string | undefined = req.params.albumId;

    const artist = await prisma.artist.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.status(200).json(artist);
}

export async function getArtists(req: Request, res: Response) {
    const albums = await prisma.artist.findMany();
    res.status(200).json(albums);
}