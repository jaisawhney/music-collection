import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Song } from '../../common/types';
import { ReactComponent as VolumeIcon } from '../../assets/icons/volume.svg';
import { addSongToQueue, clearQueue, removeSongFromQueue, setCurrentSong } from '../../features/media/queueSlice';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove.svg';
import { formatSongTime } from '../../utils/formatSongTime';
import { clsx } from 'clsx';

export default function Queue() {
    const queue: Song[] = useSelector((state: RootState) => state.queue.queue);
    const queueIdx: number = useSelector((state: RootState) => state.queue.queueIdx);
    const dispatch = useDispatch();

    return (
        <div className={'max-w-[750px] w-full'}>
            <div className={'mb-4 flex justify-between items-center'}>
                <h1 className={'font-semibold text-2xl'}>
                    Queue
                </h1>
                <button
                    className={
                        'py-0.5 px-2 text-sm text-white rounded-md bg-rose-500 hover:bg-rose-600'
                    }
                    onClick={
                        () => dispatch(clearQueue())
                    }
                >
                    Clear Queue
                </button>
            </div>

            {!!queue.length ? queue.map((song, idx) => {
                const formattedTime = formatSongTime(song.duration);

                return (
                    <div
                        key={song.id}
                        className={
                            'select-none group cursor-pointer border-b rounded-md hover:bg-gray-200 last:border-none ' +
                            'grid grid-cols-[50px_max-content_1fr_20px] gap-1 py-1'
                        }
                        onClick={() => {
                            dispatch(addSongToQueue(song));
                            dispatch(setCurrentSong(song));
                        }}
                    >
                        <div className={'flex items-center justify-center'}>
                            {idx === queueIdx ?
                                <VolumeIcon className={'m-auto h-[15px]'} /> :
                                <p className={'text-gray-500'}>
                                    {idx + 1}.
                                </p>
                            }
                        </div>
                        <div className={'flex flex-col'}>
                            <p className={'font-medium'}>
                                {song.title}
                            </p>
                            <p className={'text-gray-500'}>
                                {song.album?.name}
                            </p>
                        </div>
                        <div className={'flex justify-end items-center'}>
                            <p className={'text-gray-500'}>
                                {formattedTime}
                            </p>
                        </div>
                        <div className={'flex items-center'}>
                            <RemoveIcon
                                className={clsx(
                                    'my-auto visible h-[20px] stroke-rose-500',
                                    'md:invisible md:group-hover:visible',
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeSongFromQueue(song));
                                }}
                            />
                        </div>
                    </div>
                );
            }) : (
                <div>
                    <p className={'text-gray-500'}>
                        Nothing Queued
                    </p>
                </div>
            )}
        </div>
    );
}