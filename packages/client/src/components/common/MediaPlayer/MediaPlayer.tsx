import { Song } from '../../../common/types';
import { clsx } from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useRef } from 'react';

import { RootState } from '../../../app/store';
import { setCurrentTime, setDuration, setIsPlaying } from '../../../features/media/playerSlice';
import { setQueueIdx } from '../../../features/media/queueSlice';

import CurrentTrack from './CurrentTrack';
import Controls from './Controls';
import SeekBar from './SeekBar';
import SecondaryControls from './SecondaryControls';


import { ReactComponent as PauseIcon } from '../../../assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '../../../assets/icons/play.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as QueueIcon } from '../../../assets/icons/note-list.svg';


// TODO: Refactor file
// TODO: Split this up into smaller components?
export default function MediaPlayer() {
    const dispatch = useDispatch();

    const isPlaying: boolean = useSelector((state: RootState) => state.player.isPlaying);
    const duration: number = useSelector((state: RootState) => state.player.duration);
    const currentTime: number = useSelector((state: RootState) => state.player.currentTime);
    const volume: number = useSelector((state: RootState) => state.player.volume);

    const queue: Song[] = useSelector((state: RootState) => state.queue.queue);
    const queueIdx: number = useSelector((state: RootState) => state.queue.queueIdx);

    const currentSong: Song = queue[queueIdx];

    const audioRef = useRef<HTMLAudioElement>(null);

    // On queue updates
    useEffect(() => {
        //TODO: Clean up this function
        if (!audioRef.current) return;

        if (queueIdx >= 0 && currentSong) {
            // Start the stream
            audioRef.current.src = `/api/stream/${currentSong.mediaHash}`;
            audioRef.current.load();
            audioRef.current.play();
            dispatch(setDuration(currentSong.duration));

            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: currentSong.title,
                    artist: currentSong.artist?.name,
                    album: currentSong.album?.name,
                    artwork: [
                        {
                            src: `/api/albums/${currentSong?.album?.id}/cover?width=96&height=96`,
                            sizes: '96x96',
                            type: 'image/png',
                        },
                        {
                            src: `/api/albums/${currentSong?.album?.id}/cover?width=128&height=128`,
                            sizes: '128x128',
                            type: 'image/png',
                        },
                        {
                            src: `/api/albums/${currentSong?.album?.id}/cover?width=192&height=192`,
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: `/api/albums/${currentSong?.album?.id}/cover?width=256&height=256`,
                            sizes: '256x256',
                            type: 'image/png',
                        },
                        {
                            src: `/api/albums/${currentSong?.album?.id}/cover?width=512&height=512`,
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                });
            }
        }
    }, [queueIdx, currentSong]);

    // On pause/resume
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // On volume change
    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.volume = volume / 100;
    }, [volume]);

    function onTimeUpdate(e: ChangeEvent<HTMLAudioElement>) {
        dispatch(setCurrentTime(e.target.currentTime));
    }

    function handleSongEnd() {
        const nextIdx = queueIdx + 1;

        // Play the next song
        if (nextIdx < queue.length)
            return dispatch(setQueueIdx(nextIdx));

        // End of queue
        dispatch(setIsPlaying(false));
    }

    function toggleIsPlaying() {
        dispatch(setIsPlaying(!isPlaying));
    }

    return (
        <div className={
            'w-full h-[75px] sticky bottom-0 bg-white border px-3'
        }>
            <div className={clsx(
                'mx-auto py-2 w-full max-w-[1000px] h-full flex flex-col justify-between items-center',
                'md:flex-row-reverse',
            )}>

                <audio
                    id={'audio'}
                    ref={audioRef}
                    onPlay={() => dispatch(setIsPlaying(true))}
                    onPause={() => dispatch(setIsPlaying(false))}
                    onEnded={handleSongEnd}
                    onTimeUpdate={onTimeUpdate}
                />

                <SecondaryControls volume={volume} />

                <div className={clsx(
                    'hidden flex-col justify-center items-center max-w-[500px]',
                    'md:flex md:grow md:basis-0 ',
                )}>
                    <Controls
                        isPlaying={isPlaying}
                        queue={queue}
                        queueIdx={queueIdx}
                        toggleIsPlaying={toggleIsPlaying}
                    />

                    <SeekBar
                        duration={duration}
                        currentTime={currentTime}
                        audioRef={audioRef}
                    />
                </div>

                <div
                    className={clsx(
                        'h-full flex justify-between min-w-0 w-full',
                        'md:grow md:basis-0',
                    )}
                    onClick={() => {
                        // TODO: Add menu
                    }}
                >
                    {/* TODO: Add functionality */}
                    <CurrentTrack currentSong={currentSong} />

                    <div className={clsx(
                        'flex items-center gap-2',
                        'md:hidden',
                    )}>
                        <Link to={'/queue'}>
                            <QueueIcon className={'h-[25px]'} />
                        </Link>
                        <button onClick={toggleIsPlaying}>
                            {isPlaying ? <PauseIcon className={'h-[25px]'} /> : <PlayIcon className={'h-[25px]'} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}