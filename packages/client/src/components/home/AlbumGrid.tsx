import AlbumCard from './AlbumCard';
import { useQuery } from '@tanstack/react-query';
import { Album } from '../../common/types';

export default function AlbumGrid() {
    const { data: albums, status } = useQuery(['albums'], fetchAlbums);

    async function fetchAlbums() {
        const res = await fetch('/api/albums');
        return res.json();
    }

    if (status === 'loading')
        return <p>Loading</p>;

    if (status === 'error')
        return <p>Error</p>;


    return (
        <>
            {albums.map((album: Album) => (
                <AlbumCard  key={album.id} data={album} />
            ))}
        </>
    );
}