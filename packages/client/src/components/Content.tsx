import { Route, Routes } from 'react-router-dom';

import Home from './home/Home';
import Album from './album/Album';
import Library from './library/Library';
import Settings from './settings/Settings';

export default function Content() {
    return (
        <div className={'flex-1 flex flex-col items-center py-5 bg-neutral-50 px-3'}>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/albums/:id'} element={<Album />} />
                <Route path={'/library'} element={<Library />} />
                <Route path={'/settings'} element={<Settings />} />
            </Routes>
        </div>
    );
}