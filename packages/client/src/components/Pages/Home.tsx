import { clsx } from 'clsx';
import AlbumGrid from '../AlbumGrid';

export default function Home() {

    return (
        <>
            {/* Now Playing */}
            <div className={'max-w-[1000px] w-full flex my-10'}>
                <img src={'/uploads/covers/6.jpeg'} className={'rounded-md object-cover w-[100px] h-[100px]'}
                     alt={'Now playing'} />
                <div className={'ml-4 flex flex-col'}>
                    <h1 className={'font-semibold text-xl'}>Born For One Thing</h1>
                    <p className={'text-gray-400'}>Gojira</p>
                </div>
            </div>

            {/* Album Grid */}
            <div className={'max-w-[1000px] w-full'}>
                <h1 className={'text-left text-2xl font-semibold'}>Albums</h1>
                <div
                    className={clsx(
                        'mt-2 gap-5 content-center grid grid-cols-2',
                        'sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]',
                    )}>
                    <AlbumGrid />
                </div>
            </div>
        </>
    );
}