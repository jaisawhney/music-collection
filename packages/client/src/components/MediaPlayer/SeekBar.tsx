import { ChangeEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

import { formatSongTime } from '../../utils/formatSongTime';
import { setCurrentTime } from '../../features/media/playerSlice';

interface Props {
    duration: number;
    currentTime: number;
    audioRef: RefObject<HTMLAudioElement>;
}

export default function SeekBar(props: Props) {
    const { duration, currentTime, audioRef } = props;
    const dispatch = useDispatch();

    function onSeek(e: ChangeEvent<HTMLInputElement>) {
        // Update the currentTime and store it in the state
        if (audioRef.current) {
            const seekedTime = parseInt(e.target.value);
            audioRef.current.currentTime = seekedTime;
            dispatch(setCurrentTime(seekedTime));
        }
    }

    return (
        <div className={'w-4/12 max-w-[500px]'}>
            <p>{formatSongTime(currentTime)}</p>
            <input
                type={'range'}
                min={0}
                max={duration}
                value={currentTime}
                onChange={onSeek}
                className={'w-full accent-rose-500'}
            />
            <p>{formatSongTime(duration)}</p>
        </div>
    );
}