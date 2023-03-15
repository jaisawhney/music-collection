import { PrismaClient } from '@prisma/client';
import { ICommonTagsResult, parseBuffer, selectCover } from 'music-metadata';
import * as fs from 'fs';

import mime from 'mime-types';
import crypto from 'crypto';
import path from 'path';
import glob from 'glob';

const prisma = new PrismaClient();
const basePath = process.env.MEDIA_PATH as string;

/*
TODO: Refactor code
TODO: Split into files
*/

export async function syncMedia() {
    const mediaFiles = getMediaFiles(basePath);
    for (const mediaPath of mediaFiles) {
        const fileBuffer = fs.readFileSync(mediaPath);

        // Extract the music metadata
        const metadata: ICommonTagsResult = (await parseBuffer(fileBuffer)).common;

        if (!metadata.title || !metadata.album) continue;

        // Create a unique identifier for the file
        const hash: string = createHash(fileBuffer);

        // Record the media in the database
        const artist = await findOrCreateArtist(metadata);
        const album = await findOrCreateAlbum(artist, metadata);

        if (!album.thumbnail) await createAlbumThumbnail(artist, metadata);

        await findOrCreateSong(artist, album, mediaPath, hash, metadata);
    }
}

function getMediaFiles(dir: string) {
    const pattern = path.join(dir, '/**/*.{m4a,mp3}');
    return glob.sync(pattern, { maxDepth: 4 });
}

function createHash(buffer: Buffer) {
    return crypto.createHash('md5')
        .update(buffer)
        .digest('hex');
}

async function findOrCreateArtist(metadata: ICommonTagsResult) {
    return await prisma.artist.upsert({
        where: {
            name: metadata.artist,
        },
        update: {},
        create: {
            name: metadata.artist || 'Unknown',
        },
    });
}

async function findOrCreateAlbum(
    artist: { id: number },
    metadata: ICommonTagsResult,
) {
    return await prisma.album.upsert({
        where: {
            artistIdAndName: {
                artistId: artist.id,
                name: metadata.album as string,
            },
        },
        update: {},
        create: {
            name: metadata.album as string,
            year: metadata.year,
            artistId: artist.id,
        },
    });
}

async function createAlbumThumbnail(
    artist: { id: number },
    metadata: ICommonTagsResult,
) {
    const thumbnail = selectCover(metadata.picture);
    if (!thumbnail) return;

    const fileExtension = mime.extension(thumbnail.format);
    const filePath = path.join(basePath, `cover_${metadata.album}.${fileExtension}`);
    fs.writeFileSync(filePath, thumbnail.data, 'binary');

    return await prisma.album.update({
        where: {
            artistIdAndName: {
                artistId: artist.id,
                name: metadata.album as string,
            },
        },
        data: {
            thumbnail: filePath,
        },
    });
}

async function findOrCreateSong(
    artist: { id: number },
    album: { id: number },
    mediaPath: string,
    hash: string,
    metadata: ICommonTagsResult,
) {

    return await prisma.song.upsert({
        where: {
            mediaHash: hash,
        },
        update: {},
        create: {
            mediaPath: mediaPath,
            mediaHash: hash,
            title: metadata.title as string,
            track: metadata.track?.no,
            artist: {
                connect: {
                    id: artist.id,
                },
            },
            album: {
                connect: {
                    id: album.id,
                },
            },
            genres: {
                connectOrCreate: (metadata.genre || []).map(genre => (
                    {
                        where: { name: genre },
                        create: { name: genre },
                    }
                )),
            },
        },
    });
}