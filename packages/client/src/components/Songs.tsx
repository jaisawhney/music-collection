import { Album, Artist, Song } from '../common/types';
import { addSongToQueue } from '../features/media/queueSlice';
import { useDispatch } from 'react-redux';

import OptionsIcon from '../assets/icons/vertical-ellipsis.svg';

interface Props {
    songs: Song[];
    album: Album;
    artist: Artist;
}

export default function Songs(props: Props) {
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
                const minutes = Math.floor(song.duration / 60);
                const seconds = song.duration % 60;
                const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

                return (
                    <li
                        key={song.id}
                        onClick={() => addToQueue(song)}
                        className={'flex justify-between border-b cursor-pointer p-1 hover:bg-gray-200'}
                    >
                        <div>
                            <p className={'inline-block mr-4 text-gray-500'}>{song.track}.</p>
                            <p className={'inline-block'}>{song.title}</p>
                        </div>
                        <div>
                            <p className={'text-gray-500'}>{minutes}:{formattedSeconds}</p>
                            {/*
                            <button>
                                <img src={OptionsIcon} alt={'Options'} className={'w-[20px]'} />
                            </button>
                            */}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}