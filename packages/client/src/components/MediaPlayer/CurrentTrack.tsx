import Thumbnail from '../Thumbnail';
import { Song } from '../../common/types';

interface Props {
    currentSong: null | Song;
}

export default function CurrentTrack(props: Props) {
    const { currentSong } = props;

    return (
        <div className={'flex gap-4 h-full'}>
            <div className={'h-full'}>
                <Thumbnail image={currentSong?.album?.thumbnail} className={'h-full'} />
            </div>
            <div className={'h-full'}>
                <p className={'font-semibold text-sm'}>{currentSong?.title || '...'}</p>
                <p className={'text-gray-400 text-sm'}>{currentSong?.artist?.name || '...'}</p>
            </div>
        </div>
    );
}