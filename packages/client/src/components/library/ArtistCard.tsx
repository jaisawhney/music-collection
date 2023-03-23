import { Artist } from '../../common/types';
import { Link } from 'react-router-dom';
import Thumbnail from '../common/Thumbnail';

export default function ArtistCard(props: { data: Artist }) {
    const artist: Artist = props.data;

    return (
        <div className={'cursor-pointer'}>
            <Link to={`/artists/${artist.id}`}>
                <Thumbnail className={'mb-1'} />
                <p className={'font-semibold'}>{artist.name}</p>
            </Link>
        </div>
    );
}