import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAlbum(req: Request, res: Response) {
    const id: string | undefined = req.params.albumId;

    const album = await prisma.album.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.status(200).json(album);
}

export async function getAlbums(req: Request, res: Response) {
    const albums = await prisma.album.findMany({});
    res.status(200).json(albums);
}

export async function getAlbumSongs(req: Request, res: Response) {
    const id: string | undefined = req.params.albumId;

    const songs = await prisma.song.findMany({
        where: {
            albumId: parseInt(id),
        },
    });
    res.status(200).json(songs);
}
