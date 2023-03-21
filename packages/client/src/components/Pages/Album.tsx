import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';

import Thumbnail from '../Thumbnail';
import Songs from '../Songs';

export default function Album() {

    const { id } = useParams();

    const { data: album } = useQuery(['album', id], fetchAlbum);
    const artistId = album?.artistId;

    const { data: songs } = useQuery(['songs', id], fetchSongs);

    const { data: artist, status } = useQuery(
        ['artist', artistId], fetchArtist, { enabled: (!!artistId && Array.isArray(songs)) },
    );

    async function fetchAlbum() {
        const res = await fetch(`/api/albums/${id}`);
        return res.json();
    }

    async function fetchSongs() {
        const res = await fetch(`/api/albums/${id}/songs`);
        return res.json();
    }

    async function fetchArtist() {
        const res = await fetch(`/api/artists/${album.artistId}`);
        return res.json();
    }

    if (status === 'loading')
        return <p>Loading</p>;

    if (status === 'error')
        return <p>Error</p>;

    return (
        <div className={'max-w-[750px] w-full'}>
            <div className={clsx(
                'flex flex-wrap justify-center',
                'sm:justify-start',
            )}>
                <Thumbnail image={album.thumbnail} className={'w-[175px] h-[175px]'} />
                <div className={clsx(
                    'flex flex-col text-center',
                    'sm:ml-4 sm:text-left',
                )}>
                    <h1 className={'font-semibold text-xl'}>{album.name}</h1>
                    <p className={'text-gray-400'}>{artist.name}</p>
                </div>
            </div>
            <Songs songs={songs} album={album} artist={artist} />
        </div>
    );
}