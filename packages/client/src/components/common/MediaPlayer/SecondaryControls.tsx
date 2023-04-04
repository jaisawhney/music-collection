import { useDispatch } from 'react-redux';
import { setVolume } from '../../../features/media/playerSlice';

import { ReactComponent as QueueIcon } from '../../../assets/icons/note-list.svg';
import { ReactComponent as VolumeIcon } from '../../../assets/icons/volume.svg';
import { ReactComponent as MuteIcon } from '../../../assets/icons/mute.svg';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

interface Props {
    volume: number;
}

export default function SecondaryControls(props: Props) {
    const { volume } = props;

    const dispatch = useDispatch();

    function updateVolume(volume: string) {
        dispatch(setVolume(parseInt(volume)));
    }

    return (
        <div className={clsx(
            'hidden',
            'md:flex md:justify-end md:grow md:basis-0',
        )}>
            <Link to={'/queue'} className={'h-[18px]'}>
                <QueueIcon className={'h-full'} />
            </Link>
            <div className={'h-[18px] mx-2'}>
                {volume != 0 ? <VolumeIcon className={'h-full'} /> : <MuteIcon className={'h-full'} />}
            </div>
            <input
                type={'range'}
                min={'0'}
                max={'100'}
                defaultValue={'50'}
                onChange={(e) =>
                    updateVolume(e.target.value)
                }
                className={'accent-rose-500'}
            />
        </div>
    );
}