import { Song } from '../../common/types';
import { addSongToQueue, setCurrentSong } from '../../features/media/queueSlice';
import { useDispatch } from 'react-redux';

import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import { formatSongTime } from '../../utils/formatSongTime';
import { clsx } from 'clsx';

interface Props {
    songs: Song[];
}

export default function AlbumSongs(props: Props) {
    const { songs } = props;
    const dispatch = useDispatch();

    return (
        <div className={'my-5'}>
            {!!songs && songs.map((song: Song) => {
                const formattedTime = formatSongTime(song.duration);

                return (
                    <div
                        key={song.id}
                        className={
                            'select-none group border-b cursor-pointer hover:bg-gray-200 last:border-none ' +
                            'grid grid-cols-[minmax(20px,min-content)_max-content_1fr_20px] gap-1 px-1 py-2'
                        }
                        onClick={() => {
                            dispatch(addSongToQueue(song));
                            dispatch(setCurrentSong(song));
                        }}
                    >
                        <div>
                            <p className={'text-gray-500'}>
                                {song.track}.
                            </p>
                        </div>
                        <div>
                            <p>
                                {song.title}
                            </p>
                        </div>
                        <div className={'flex justify-end'}>
                            <p className={'text-gray-500'}>
                                {formattedTime}
                            </p>
                        </div>
                        <div className={'flex'}>
                            <AddIcon
                                className={clsx(
                                    'my-auto visible h-[20px] fill-rose-500',
                                    'md:invisible md:group-hover:visible',
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(addSongToQueue(song));
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}