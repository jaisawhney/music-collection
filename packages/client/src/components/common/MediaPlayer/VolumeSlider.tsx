import { useDispatch } from 'react-redux';
import { setVolume } from '../../../features/media/playerSlice';

import { ReactComponent as VolumeIcon } from '../../../assets/icons/volume.svg';
import { ReactComponent as MuteIcon } from '../../../assets/icons/mute.svg';

interface Props {
    volume: number;
}

export default function VolumeSlider(props: Props) {
    const { volume } = props;

    const dispatch = useDispatch();

    function updateVolume(volume: string) {
        dispatch(setVolume(volume));
    }

    return (
        <div className={'flex'}>
            <div className={'h-[20px] mr-2'}>
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