import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


export async function createSong(req: Request, res: Response) {
    res.status(200);
}

export async function getSong(req: Request, res: Response) {
    const id: number = parseInt(req.params.songId);
    const song = prisma.song.findUnique({
        where: {
            id: id
        }
    });
    res.status(200).json(song);
}

export async function getSongs(req: Request, res: Response) {
    const song = prisma.song.findMany();
    res.status(200).json(song);
}

export async function updateSong(req: Request, res: Response) {
    res.status(200);
}

export async function deleteSong(req: Request, res: Response) {
    res.status(200);
}