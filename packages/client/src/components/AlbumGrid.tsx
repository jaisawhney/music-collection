import AlbumCard from './AlbumCard';
import { useQuery } from '@tanstack/react-query';

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
            {albums.map((album: any) => (
                <AlbumCard  key={album.id} data={album} />
            ))}
        </>
    );
}