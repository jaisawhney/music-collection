import { Song } from '../../common/types';
import Thumbnail from '../Thumbnail';

interface Props {
    currentSong: null | Song;
}

export default function CurrentTrack(props: Props) {
    const { currentSong } = props;

    return (
        <div className={'flex gap-4 h-full'}>
            <Thumbnail image={currentSong?.album?.thumbnail} className={'h-full'} />
            <div>
                <p className={'font-semibold text-sm'}>{currentSong?.title || '...'}</p>
                <p className={'text-gray-500 text-sm'}>{currentSong?.artist?.name || '...'}</p>
            </div>
        </div>
    );
}