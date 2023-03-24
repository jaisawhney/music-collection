import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Setting {
    name: string;
    value: string;
}

export default function Settings() {
    /*const { data: settings, status } = useQuery(['settings'], fetchSettings);
    const [mediaPath, setMediaPath] = useState<string>('');

    async function fetchSettings() {
        // Fetch the current settings from the API
        const res = await fetch(`/api/settings`);
        return res.json();
    }*/

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        /*fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                settings: {
                    MEDIA_PATH: mediaPath,
                },
            }),
        }).then(r => console.log(r));*/

        fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(r => console.log(r));
    }

    /*
        useEffect(() => {
            if (!!settings) {
                const MEDIA_PATH = settings.find((setting: Setting) => setting.name === 'MEDIA_PATH');
                if (MEDIA_PATH) setMediaPath(MEDIA_PATH.value);
            }
        }, [settings]);

        if (status === 'loading')
            return <p>Loading</p>;

        if (status === 'error')
            return <p>Error</p>;*/

    return (
        <div className={'max-w-[750px] w-full'}>
            <h1 className={'font-semibold text-2xl'}>
                Settings
            </h1>
            <form onSubmit={handleSubmit} className={'my-2'}>
                {/*<input value={mediaPath} onChange={(e) => setMediaPath(e.target.value)} />*/}
                <button
                    type={'submit'}
                    className={
                        'px-2 py-0.5 text-white rounded-md bg-rose-500 hover:bg-rose-600'
                    }
                >
                    Save & Refresh Media
                </button>
            </form>
        </div>
    );
}