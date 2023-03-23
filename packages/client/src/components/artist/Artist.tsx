import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import Thumbnail from '../common/Thumbnail';
import ArtistAlbums from './ArtistAlbums';

export default function Artist() {

    const { id } = useParams();

    const { data: artist } = useQuery(['artist', id], fetchArtist);

    const { data: albums, status } = useQuery(['artistAlbums', id], fetchAlbums, { enabled: !!artist });

    async function fetchArtist() {
        const res = await fetch(`/api/artists/${id}`);
        return res.json();
    }

    async function fetchAlbums() {
        const res = await fetch(`/api/artists/${id}/albums`);
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
                <Thumbnail className={'w-[175px] h-[175px]'} />
                <div className={clsx(
                    'flex flex-col text-center',
                    'sm:ml-4 sm:text-left',
                )}>
                    <h1 className={'font-semibold text-xl'}>{artist.name}</h1>
                    <p className={'text-gray-500'}>
                        {albums.length} {albums.length > 1 ? 'Albums' : 'Album'}
                    </p>
                </div>
            </div>
            <h1 className={'font-semibold text-xl mt-4 mb-1'}>Albums</h1>
            <ArtistAlbums artist={artist} albums={albums} />
        </div>
    );
}