import AlbumCard from './AlbumCard';
import { Album } from '../../common/types';
import { clsx } from 'clsx';

interface Props {
    albums: Album[];
}

export default function AlbumGrid(props: Props) {
    const { albums } = props;

    return (
        <div
            className={clsx(
                'w-full mt-2 gap-5 content-center grid grid-cols-2',
                'sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]',
            )}
        >
            {albums.map((album: Album) => (
                <AlbumCard key={album.id} data={album} />
            ))}
        </div>
    );
}