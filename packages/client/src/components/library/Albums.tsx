import { clsx } from 'clsx';
import AlbumGrid from './AlbumGrid';


export default function Albums() {

    return (
        <div className={'w-full'}>
            <div
                className={clsx(
                    'mt-2 gap-5 content-center grid grid-cols-2',
                    'sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]',
                )}
            >
                <AlbumGrid />
            </div>
        </div>
    );
}