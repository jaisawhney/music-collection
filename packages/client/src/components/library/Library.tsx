import { NavLink, Outlet } from 'react-router-dom';
import { clsx } from 'clsx';

export default function Library() {
    const navLinkClassnames = ({ isActive }: { isActive: boolean }) => {
        return clsx(
            'px-2 py-1 bg-gray-200 rounded-md',
            isActive && 'bg-rose-400 text-white',
        );
    };

    return (
        <div className={'max-w-[1000px] w-full'}>
            <div className={'mb-5'}>
                <h1 className={'text-left text-2xl font-semibold'}>Your Library</h1>
                <div className={'mt-2 flex flex-wrap gap-4'}>
                    <NavLink to={`albums`} className={navLinkClassnames}>
                        <p>Albums</p>
                    </NavLink>
                    <NavLink to={`artists`} className={navLinkClassnames}>
                        <p>Artists</p>
                    </NavLink>
                    <NavLink to={`playlists`} className={navLinkClassnames}>
                        <p>Playlists</p>
                    </NavLink>
                    <NavLink to={`songs`} className={navLinkClassnames}>
                        <p>Songs</p>
                    </NavLink>
                </div>
            </div>

            <Outlet />
        </div>
    );
}