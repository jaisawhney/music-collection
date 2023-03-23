import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';

import Thumbnail from '../common/Thumbnail';
import AlbumSongs from './AlbumSongs';

export default function Album() {

    const { id } = useParams();

    const { data: album } = useQuery(['album', id], fetchAlbum);
    const { data: songs, status } = useQuery(['albumSongs', id], fetchSongs, { enabled: !!album });

    async function fetchAlbum() {
        const res = await fetch(`/api/albums/${id}`);
        return res.json();
    }

    async function fetchSongs() {
        const res = await fetch(`/api/albums/${id}/songs`);
        return res.json();
    }

    if (status === 'loading')
        return <p>Loading</p>;

    if (status === 'error')
        return <p>Error</p>;

    return (
        <div className={'max-w-[750px] w-full'}>
            <div className={clsx(
                'flex flex-wrap content-center flex-col',
                'sm:justify-start sm:flex-row',
            )}>
                <Thumbnail image={album.thumbnail} className={'w-[175px] h-[175px]'} />
                <div className={clsx(
                    'flex flex-col text-center',
                    'sm:ml-4 sm:text-left',
                )}>
                    <h1 className={'font-semibold text-xl'}>{album.name}</h1>
                    <p className={'text-gray-500'}>{album.artist.name}</p>
                </div>
            </div>
            <AlbumSongs songs={songs} album={album} artist={album.artist} />
        </div>
    );
}