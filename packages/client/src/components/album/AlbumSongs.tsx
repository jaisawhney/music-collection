import { Album, Artist, Song } from '../../common/types';
import { addSongToQueue, setCurrentSong } from '../../features/media/queueSlice';
import { useDispatch } from 'react-redux';

import { ReactComponent as OptionsIcon } from '../../assets/icons/vertical-ellipsis.svg';
import { formatSongTime } from '../../utils/formatSongTime';

interface Props {
    songs: Song[];
    album: Album;
    artist: Artist;
}

export default function AlbumSongs(props: Props) {
    const { songs, album, artist } = props;
    const dispatch = useDispatch();

    function addToQueue(song: Song) {
        dispatch(addSongToQueue({
            ...song,
            artist: artist,
            album: album,
        }));
    }

    return (
        <ul className={'my-5'}>
            {!!songs && songs.map((song: Song) => {
                const formattedTime = formatSongTime(song.duration);

                return (
                    <li key={song.id}
                        className={'select-none group flex justify-between border-b cursor-pointer hover:bg-gray-200 last:border-none'}
                    >
                        <div className={'grow flex justify-between px-1 py-2'}
                             onClick={() => {
                                 addToQueue(song);
                                 dispatch(setCurrentSong(song));
                             }}
                        >
                            <p>
                                <span className={'text-gray-500'}>{song.track}.</span> {song.title}
                            </p>
                            <p className={'text-gray-500'}>{formattedTime}</p>
                        </div>

                        <button className={'invisible group-hover:visible'}
                                onClick={() => console.log(`id: ${song.id}`)}
                        >
                            <OptionsIcon className={'h-[20px] fill-rose-500'} />
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}