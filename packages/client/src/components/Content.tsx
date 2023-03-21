import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Album from './Pages/Album';
import Library from './Pages/Library';
import Settings from './Pages/Settings';

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