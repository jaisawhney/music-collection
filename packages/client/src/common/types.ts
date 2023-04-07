export interface Artist {
    id: number;
    name: string;
}

export interface Album {
    id: number;
    name: string;
    year: number;
    artistId: number;
    artist: Artist;
}

export interface Song {
    id: number;
    title: string;
    mediaHash: string;
    duration: number;
    track?: number;
    album?: Album;
    artist?: Artist;
    genre?: { id: number, name: string };
}