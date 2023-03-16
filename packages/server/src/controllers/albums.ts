import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAlbum(req: Request, res: Response) {
    const id: string = req.params.albumId;
    const album = await prisma.album.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.status(200).json(album);
}

export async function getAlbums(req: Request, res: Response) {
    const albums = await prisma.album.findMany({
        include: {
            artist: true,
        },
    });
    res.status(200).json(albums);
}