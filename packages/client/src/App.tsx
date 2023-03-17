import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Content from './components/Content';
import MediaPlayer from './components/MediaPlayer/MediaPlayer';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={'min-h-screen w-100 flex flex-col justify-between'}>
                <Header />
                <Content />
                <MediaPlayer />
            </div>
        </QueryClientProvider>
    );
}

export default App;
