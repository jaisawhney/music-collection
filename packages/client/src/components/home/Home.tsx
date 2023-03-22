import { clsx } from 'clsx';
import AlbumGrid from '../library/AlbumGrid';
import Thumbnail from '../common/Thumbnail';
import { Song } from '../../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function Home() {
    const queue: Song[] = useSelector((state: RootState) => state.queue.queue);
    const queueIdx: number = useSelector((state: RootState) => state.queue.queueIdx);

    const song = queueIdx !== -1 ? queue[queueIdx] : null;

    // TODO: Split this up into smaller components?
    return (
        <>
            {/* Now Playing */}
            {song && (
                <div className={'max-w-[1000px] w-full flex my-5'}>
                    <Thumbnail image={song.album?.thumbnail}
                               className={'rounded-md object-cover w-[100px] h-[100px]'}
                    />
                    <div className={'ml-4 flex flex-col'}>
                        <h1 className={'font-semibold text-xl'}>{song.title || '...'}</h1>
                        <p className={'text-gray-500'}>{song.artist?.name || '...'}</p>
                    </div>
                </div>
            )}
            {/* Album Grid */}
            <div className={'max-w-[1000px] w-full'}>
                <h1 className={'text-left text-2xl font-semibold'}>Albums</h1>
                <div
                    className={clsx(
                        'mt-2 gap-5 content-center grid grid-cols-2',
                        'sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]',
                    )}
                >
                    <AlbumGrid />
                </div>
            </div>
        </>
    );
}

export default Home;