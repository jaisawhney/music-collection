import { useQuery } from '@tanstack/react-query';
import AlbumGrid from './AlbumGrid';

export default function Albums() {
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
       <AlbumGrid albums={albums}/>
    );
}