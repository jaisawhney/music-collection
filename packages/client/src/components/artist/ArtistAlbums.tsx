import { Album, Artist } from '../../common/types';
import Thumbnail from '../common/Thumbnail';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

interface Props {
    artist: Artist;
    albums: Album[];
}

export default function ArtistAlbums(props: Props) {
    const { albums } = props;

    return (
        <div className={clsx('grid grid-cols-1 gap-4',
            'sm:grid-cols-[repeat(auto-fill,minmax(125px,1fr))]')}>
            {albums.map(album => (
                <div key={album.id} className={clsx(
                    'flex gap-5 flex-row',
                    'sm:gap-2 sm:flex-col',
                )}>
                    <Link to={`/albums/${album.id}`}>
                        <Thumbnail image={album.thumbnail} className={clsx(
                            'w-[100px]',
                            'sm:w-full',
                        )} />
                    </Link>

                    <div className={''}>
                        <h2 className={'font-bold'}>{album.name}</h2>
                        <p className={'text-gray-500'}>{album.year}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}