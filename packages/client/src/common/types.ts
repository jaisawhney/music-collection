export interface Album {
    id: number;
    name: string;
    year: number;
    thumbnail: string;
    artist: {
        name: string
    };
    artistId: number
}

export interface Artist {
    id: number;
    name: string;
}

export interface Song {
    id: number;
    title: string;
    mediaHash: string;
    duration: number;
    track?: number;
    album?: Album;
    artist?: Artist
}