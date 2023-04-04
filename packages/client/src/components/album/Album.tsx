import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';

import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';
import { useDispatch } from 'react-redux';
import { setCurrentSong, setQueueItems } from '../../features/media/queueSlice';

import Thumbnail from '../common/Thumbnail';
import AlbumSongs from './AlbumSongs';

export default function Album() {
    const { id } = useParams();

    const { data: album } = useQuery(['album', id], fetchAlbum);
    const { data: songs, status } = useQuery(['albumSongs', id], fetchSongs, { enabled: !!album });

    const dispatch = useDispatch();

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
                'flex flex-wrap items-center flex-col',
                'sm:justify-start sm:flex-row',
            )}>
                <Thumbnail image={album.thumbnail} className={'w-[175px] h-[175px]'} />
                <div className={clsx(
                    'flex flex-col text-center justify-center',
                    'sm:ml-4 sm:text-left',
                )}>
                    <div className={'my-1'}>
                        <h1 className={'font-semibold text-xl'}>
                            {album.name}
                        </h1>
                        <Link to={`/artists/${album.artist.id}`} className={'text-gray-500'}>
                            {album.artist.name}
                        </Link>
                    </div>
                    <button
                        className={clsx(
                            'py-0.5 text-white text-sm rounded-md bg-rose-500 hover:bg-rose-600 w-full',
                            'sm:w-[100px]',
                        )}
                        onClick={() => {
                            dispatch(setQueueItems(songs));
                            dispatch(setCurrentSong(songs[0]));
                        }}
                    >
                        <PlayIcon className={'h-[15px] inline-block align-middle'} />
                        <p className={'inline-block align-middle'}>Play All</p>
                    </button>
                </div>
            </div>
            <AlbumSongs songs={songs} />
        </div>
    );
}