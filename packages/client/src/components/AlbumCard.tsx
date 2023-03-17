import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Thumbnail from './Thumbnail';

interface Album {
    id: number;
    name: string;
    year: number;
    thumbnail: string;
    artist: {
        name: string
    };
    artistId: number
}

export default function AlbumCard(props: { data: Album }) {
    const  album: Album = props.data;

    const { data: artist, status } = useQuery(['album'], fetchArtist);

    async function fetchArtist() {
        const res = await fetch(`/api/artists/${album.artistId}`);
        return res.json();
    }

    if (status === 'loading')
        return <p>Loading</p>;

    if (status === 'error')
        return <p>Error</p>;

    return (
        <div className={'cursor-pointer'}>
            <Link to={`/albums/${album.id}`}>
                <Thumbnail image={album.thumbnail} />
                <p className={'font-semibold'}>{album.name}</p>
                <p className={'text-gray-400'}>{artist.name}</p>
            </Link>
        </div>
    );
}