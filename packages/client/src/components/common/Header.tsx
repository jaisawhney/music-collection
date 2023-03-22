import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export default function Header() {

    const navLinkClassnames = ({ isActive }: { isActive: boolean }) => {
        return clsx(
            'p-1 font-bold uppercase',
            isActive && 'bottom-pill',
        );
    };

    return (
        <div className={clsx(
            'p-4 flex justify-center gap-5',
            'sm:gap-24',
        )}>
            <NavLink to={`/`} className={navLinkClassnames}>
                <p>Home</p>
            </NavLink>
            <NavLink to={`/library`} className={navLinkClassnames}>
                <p>Library</p>
            </NavLink>

            <NavLink to={`/settings`} className={navLinkClassnames}>
                <p>Settings</p>
            </NavLink>
        </div>
    );
}