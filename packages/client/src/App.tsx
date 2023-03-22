import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Content from './components/Content';
import MediaPlayer from './components/common/MediaPlayer/MediaPlayer';
import Header from './components/common/Header';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div className={'min-h-screen w-100 flex flex-col justify-between'}>
                    <Header />
                    <Content />
                    <MediaPlayer />
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
