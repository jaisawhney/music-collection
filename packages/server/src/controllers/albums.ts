import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import mime from 'mime-types';

const prisma = new PrismaClient();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getAlbum(req: Request, res: Response) {
    const id: string = req.params.albumId;

    const album = await prisma.album.findUnique({
        where: {
            id: parseInt(id),
        },
        include: { artist: true },
    });
    res.status(200).json(album);
}

export async function getAlbums(req: Request, res: Response) {
    const albums = await prisma.album.findMany({
        include: { artist: true },
    });
    res.status(200).json(albums);
}

export async function getAlbumSongs(req: Request, res: Response) {
    const id: string = req.params.albumId;

    const songs = await prisma.song.findMany({
        where: {
            albumId: parseInt(id),
        },
        orderBy: {
            track: 'asc',
        },
        include: { genre: true, album: true, artist: true },
    });
    res.status(200).json(songs);
}

// TODO: Clean
async function resizeImage(path: string, width?: number, height?: number, type?: string) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();

    if (type) transform.toFormat(type as any);

    transform.resize(width, height);
    return readStream.pipe(transform);
}

export async function getAlbumCover(req: Request, res: Response) {
    const id: string = req.params.albumId;

    const album = await prisma.album.findUnique({
        where: {
            id: parseInt(id),
        },
        include: { artist: true },
    });

    const { width, height, type } = req.query;

    const widthInt = width && parseInt(width as string) || undefined;
    const heightInt = height && parseInt(height as string) || undefined;

    const defaultThumbnail = path.join(__dirname, '../public/uploads/covers/default.png');
    const resizedImage = await resizeImage(album?.thumbnail || defaultThumbnail, widthInt, heightInt, type as string);
    const extension = mime.lookup((await resizedImage.metadata()).format as string);

    res.type(extension.toString());
    resizedImage.pipe(res);
}