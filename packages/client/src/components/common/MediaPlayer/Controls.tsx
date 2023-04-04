import { Song } from '../../../common/types';
import { useDispatch } from 'react-redux';

import { setQueueIdx } from '../../../features/media/queueSlice';

import { ReactComponent as BackwardIcon } from '../../../assets/icons/backward.svg';
import { ReactComponent as ForwardIcon } from '../../../assets/icons/forward.svg';
import { ReactComponent as PauseIcon } from '../../../assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '../../../assets/icons/play.svg';

interface Props {
    isPlaying: boolean;
    queue: Song[];
    queueIdx: number;
    toggleIsPlaying: () => void;
}

export default function Controls(props: Props) {
    const { isPlaying, queue, queueIdx, toggleIsPlaying } = props;
    const dispatch = useDispatch();

    function onPrevious() {
        if (queueIdx < 0) return;

        if (queueIdx === 0) {
            // First song, wrap to end
            dispatch(setQueueIdx(queue.length - 1));
        } else {
            dispatch(setQueueIdx(queueIdx - 1));
        }
    }

    function onNext() {
        if (queueIdx < 0) return;

        if (queueIdx === queue.length - 1) {
            // Last song, wrap to start
            dispatch(setQueueIdx(0));
        } else {
            dispatch(setQueueIdx(queueIdx + 1));
        }
    }

    return (
        <div className={'flex items-center justify-center'}>
            <button onClick={onPrevious}>
                <BackwardIcon className={'h-[20px]'} />
            </button>
            <button onClick={toggleIsPlaying}>
                {isPlaying ? <PauseIcon className={'h-[25px]'} /> : <PlayIcon className={'h-[25px]'} />}
            </button>
            <button onClick={onNext}>
                <ForwardIcon className={'h-[20px]'} />
            </button>
        </div>
    );
}