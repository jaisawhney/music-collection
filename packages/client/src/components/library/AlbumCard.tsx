import { Album } from '../../common/types';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Thumbnail from '../common/Thumbnail';



export default function AlbumCard(props: { data: Album }) {
    const album: Album = props.data;
    const { data: artist, status } = useQuery(['album', album.artistId], fetchArtist);

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
                <Thumbnail image={album.thumbnail} className={'mb-1'} />
                <p className={'font-semibold'}>{album.name}</p>
                <p className={'text-gray-500'}>{artist.name}</p>
            </Link>
        </div>
    );
}