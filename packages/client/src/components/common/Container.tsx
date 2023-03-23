import { Outlet } from 'react-router-dom';
import Header from './Header';
import MediaPlayer from './MediaPlayer/MediaPlayer';

export default function Container() {

    return (
        <div className={'min-h-screen w-100 flex flex-col justify-between'}>
            <Header />

            {/* Main Content */}
            <div className={'flex-1 flex flex-col items-center my-4 px-3'}>
                <Outlet />
            </div>

            <MediaPlayer />
        </div>
    );
}