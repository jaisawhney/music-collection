import { ChangeEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

import { formatSongTime } from '../../../utils/formatSongTime';
import { setCurrentTime } from '../../../features/media/playerSlice';

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
        <div className={'w-full max-w-[500px] flex gap-2'}>
            <p className={'text-sm text-gray-500'}>{formatSongTime(currentTime)}</p>
            <input
                type={'range'}
                min={0}
                max={duration}
                value={currentTime}
                onChange={onSeek}
                className={'w-full accent-rose-500'}
            />
            <p className={'text-sm text-gray-500'}>{formatSongTime(duration)}</p>
        </div>
    );
}