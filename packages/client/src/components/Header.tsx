import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export default function Header() {


    const test = ({ isActive }: { isActive: boolean }) => {
        return clsx(
            'p-1 font-bold uppercase',
            isActive && 'bottom-pill',
        );
    };

    return (
        <div className={clsx(
            'p-4 w-full text-center flex justify-center gap-5',
            'sm:gap-24',
        )}>
            <NavLink to={`/`} className={test}>
                <p>Home</p>
            </NavLink>
            <NavLink to={`/library`} className={test}>
                <p>Library</p>
            </NavLink>

            <NavLink to={`/settings`} className={test}>
                <p>Settings</p>
            </NavLink>
        </div>
    );
}