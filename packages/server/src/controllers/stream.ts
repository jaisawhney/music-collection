import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import * as fs from "fs";

const prisma = new PrismaClient()

export async function musicStream(req: Request, res: Response) {
    const mediaHash = req.params.mediaHash;
    const song = await prisma.song.findUnique({
        where: {
            mediaHash: mediaHash
        }
    });

    const mediaPath = song?.mediaPath;
    if (!mediaPath) return res.status(404).json({"msg": "Not found"});

    const stat = fs.statSync(mediaPath);
    res.header({
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Content-Length': stat.size
    });
    const stream = await fs.createReadStream(mediaPath);
    stream.pipe(res);
}