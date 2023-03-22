import { Link } from 'react-router-dom';

export default function NotFound() {

    return (
        <div className={'w-full h-screen flex flex-col justify-center items-center '}>
                <h1 className={'font-bold text-5xl'}>404</h1>
                <p className={'font-medium text-gray-500'}>Not found</p>
                <Link to={'/'}>
                    <p className={'px-2 py-1 mt-4 text-white rounded-md bg-rose-500 hover:bg-rose-400'}>Go Home</p>
                </Link>
        </div>
    );
}