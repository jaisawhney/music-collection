export interface Artist {
    id: number;
    name: string;
}

export interface Album {
    id: number;
    name: string;
    year: number;
    thumbnail: string;
    artistId: number;
    artist: Artist;
}

export interface Song {
    id: number;
    title: string;
    mediaHash: string;
    duration: number;
    track?: number;
    albumId?: number;
    album?: Album;
    artistId?: number;
    artist?: Artist;
    genre?: { id: number, name: string };
}