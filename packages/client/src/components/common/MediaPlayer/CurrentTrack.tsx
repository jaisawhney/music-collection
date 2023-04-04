import { Song } from '../../../common/types';
import Thumbnail from '../Thumbnail';

interface Props {
    currentSong: null | Song;
}

export default function CurrentTrack(props: Props) {
    const { currentSong } = props;

    return (
        <div className={'flex items-center gap-4 h-full overflow-hidden'}>
            <Thumbnail image={currentSong?.album?.thumbnail} className={'h-full'} />
            <div className={'overflow-hidden whitespace-nowrap'}>
                <p className={'font-semibold text-sm text-ellipsis overflow-hidden'}>{currentSong?.title || '...'}</p>
                <p className={'text-gray-500 text-sm text-ellipsis overflow-hidden '}>{currentSong?.artist?.name || '...'}</p>
            </div>
        </div>
    );
}