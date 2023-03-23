import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './components/home/Home';
import Album from './components/album/Album';
import Settings from './components/settings/Settings';
import Library from './components/library/Library';
import Albums from './components/library/Albums';
import Artists from './components/library/Artists';
import Playlists from './components/library/Playlists';
import Songs from './components/library/Songs';
import NotFound from './components/common/NotFound';
import Container from './components/common/Container';
import Artist from './components/artist/Artist';
import Queue from './components/queue/Queue';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Container/>}>
                        <Route index element={<Home />} />
                        <Route path={'/albums/:id'} element={<Album />} />
                        <Route path={'/artists/:id'} element={<Artist />} />
                        <Route path={'/settings'} element={<Settings />} />
                        <Route path={'/queue'} element={<Queue />} />
                        <Route path={'/library/*'} element={<Library />}>
                            <Route index element={<Navigate replace={true} to={'albums'}/>} />
                            <Route path={'albums'} element={<Albums />} />
                            <Route path={'artists'} element={<Artists />} />
                            <Route path={'playlists'} element={<Playlists />} />
                            <Route path={'songs'} element={<Songs />} />
                        </Route>
                    </Route>
                    <Route path={'*'} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
