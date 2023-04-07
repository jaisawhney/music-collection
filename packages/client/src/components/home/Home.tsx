import Thumbnail from '../common/Thumbnail';
import { Song } from '../../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Albums from '../library/Albums';

function Home() {
    const queue: Song[] = useSelector((state: RootState) => state.queue.queue);
    const queueIdx: number = useSelector((state: RootState) => state.queue.queueIdx);

    const song = queueIdx !== -1 ? queue[queueIdx] : null;

    return (
        <>
            {/* Now Playing */}
            {song && (
                <div className={'max-w-[1000px] w-full flex my-5'}>
                    <Thumbnail image={`/api/albums/${song?.album?.id}/cover`}
                               className={'rounded-md object-cover w-[100px] h-[100px]'}
                    />
                    <div className={'ml-4 flex flex-col'}>
                        <h1 className={'font-semibold text-xl'}>{song.title || '...'}</h1>
                        <p className={'text-gray-500'}>{song.artist?.name || '...'}</p>
                    </div>
                </div>
            )}
            {/* Album Grid (TEMPORARY) */}
            <div className={'max-w-[1000px] w-full'}>
                <h1 className={'text-left text-2xl font-semibold'}>Albums</h1>
                <Albums />
            </div>
        </>
    );
}

export default Home;