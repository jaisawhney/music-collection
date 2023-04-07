import { Album } from '../../common/types';
import { Link } from 'react-router-dom';
import Thumbnail from '../common/Thumbnail';

export default function AlbumCard(props: { data: Album }) {
    const album: Album = props.data;

    return (
        <div className={'cursor-pointer'}>
            <Link to={`/albums/${album.id}`}>
                <Thumbnail image={`/api/albums/${album.id}/cover`} className={'mb-1'} />
                <p className={'font-semibold'}>{album.name}</p>
                <p className={'text-gray-500'}>{album.artist.name}</p>
            </Link>
        </div>
    );
}