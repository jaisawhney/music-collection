import { PrismaClient } from '@prisma/client';
import { IAudioMetadata, parseBuffer, selectCover } from 'music-metadata';
import { fileURLToPath } from 'url';

import path from 'path';
import * as fs from 'fs';

import mime from 'mime-types';
import crypto from 'crypto';
import glob from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

export async function syncMedia() {
    let basePath: string = process.env.MEDIA_PATH as string;
    if (!basePath) throw Error('Missing media path!');

    const mediaFolderDetails = fs.existsSync(basePath) && fs.lstatSync(basePath).isDirectory();
    if (!mediaFolderDetails) throw Error('Invalid media folder!');

    const files = getMediaFiles(basePath);
    for (const file of files) {
        // Load the file into a buffer and create a unique identifier for the file
        const fileBuffer: Buffer = fs.readFileSync(file);
        const hash: string = createHash(fileBuffer);

        // Extract the music metadata by parsing the file buffer
        const metadata: IAudioMetadata = await parseBuffer(fileBuffer, undefined, { duration: true });

        if (!metadata.common.title || !metadata.common.album || !metadata.common.artist) continue;

        // Add the media metadata to the database
        const artist = await findOrCreateArtist(metadata);
        const album = await findOrCreateAlbum(artist, metadata);

        // Extract the album cover if not already present
        if (!album.thumbnail) await createAlbumThumbnail(album, metadata);

        const song = await findOrCreateSong(artist, album, file, hash, metadata);

        // Connect the genre if it exists in the metadata
        const genres = metadata.common.genre;
        if (!!genres?.length) await connectGenre(song, genres);
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

async function findOrCreateArtist(metadata: IAudioMetadata) {
    return await prisma.artist.upsert({
        where: {
            name: metadata.common.artist,
        },
        update: {},
        create: {
            name: metadata.common.artist || 'Unknown',
        },
    });
}

async function findOrCreateAlbum(
    artist: { id: number },
    metadata: IAudioMetadata,
) {
    return await prisma.album.upsert({
        where: {
            artistIdAndName: {
                artistId: artist.id,
                name: metadata.common.album as string,
            },
        },
        update: {},
        create: {
            name: metadata.common.album as string,
            year: metadata.common.year,
            artistId: artist.id,
        },
    });
}

async function createAlbumThumbnail(
    album: { id: number, name: string, artistId: number },
    metadata: IAudioMetadata,
) {
    // Check if the metadata includes a thumbnail
    const thumbnail = selectCover(metadata.common.picture);
    if (!thumbnail) return;

    // Store the thumbnail on the server
    const fileExtension = mime.extension(thumbnail.format);
    const uploadsPath = path.join(__dirname, '../public', 'uploads', 'covers');
    const filePath = path.join(uploadsPath, `cover_${album.id}.${fileExtension}`);

    fs.writeFileSync(filePath, thumbnail.data, 'binary');

    return await prisma.album.update({
        where: {
            artistIdAndName: {
                artistId: album.artistId,
                name: metadata.common.album as string,
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
    metadata: IAudioMetadata,
) {
    return await prisma.song.upsert({
        where: {
            mediaHash: hash,
        },
        update: {},
        create: {
            mediaPath: mediaPath,
            mediaHash: hash,
            title: metadata.common.title as string,
            track: metadata.common.track?.no,
            duration: Math.round(metadata.format.duration || 0),
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
        },
    });
}

async function connectGenre(song: { id: number }, genres: string[]) {
    const genre = genres[0];
    return prisma.song.update({
        where: {
            id: song.id,
        },
        data: {
            genre: {
                connectOrCreate: {
                    where: {
                        name: genre,
                    },
                    create: {
                        name: genre,
                    },
                },
            },
        },
    });
}