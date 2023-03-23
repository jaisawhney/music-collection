import { useQuery } from '@tanstack/react-query';
import { Artist } from '../../common/types';
import { clsx } from 'clsx';
import ArtistCard from './ArtistCard';

export default function Artists() {
    const { data: artists, status } = useQuery(['artists'], fetchArtists);

    async function fetchArtists() {
        const res = await fetch('/api/artists');
        return res.json();
    }

    if (status === 'loading')
        return <p>Loading</p>;

    if (status === 'error')
        return <p>Error</p>;

    return (
        <div
            className={clsx(
                'w-full mt-2 gap-5 content-center grid grid-cols-2',
                'sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]',
            )}
        >
            {artists.map((artist: Artist) => (
                <ArtistCard key={artist.id} data={artist} />
            ))}
        </div>
    );
}