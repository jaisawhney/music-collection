import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { clsx } from 'clsx';

import { Song } from '../../common/types';
import { formatSongTime } from '../../utils/formatSongTime';
import { addSongToQueue, setCurrentSong } from '../../features/media/queueSlice';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';


export default function Songs() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data: songs, status } = useQuery(['songs'], fetchSongs);

    async function fetchSongs() {
        const res = await fetch('/api/songs');
        return res.json();
    }

    if (status === 'loading')
        return <p>Loading</p>;

    if (status === 'error')
        return <p>Error</p>;

    const filteredSongs = songs.filter((song: Song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className={'w-full'}>
            <div className={'flex items-center mb-2'}>
                <SearchIcon className={'h-[15px] absolute m-2 fill-gray-800'} />
                <input
                    type={'text'}
                    placeholder={'Filter by name'}
                    className={'border pl-7 py-1 text-sm rounded-sm'}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />
            </div>
            <table className={'w-full'}>
                <thead>
                <tr className={'text-left bg-neutral-100'}>
                    <th scope={'col'} className={'px-2 py-1'}>
                        Title
                    </th>
                    <th scope={'col'} className={clsx(
                        'px-2 py-1 hidden',
                        'sm:table-cell',
                    )}>
                        Album
                    </th>
                    <th scope={'col'} className={clsx(
                        'px-2 py-1 hidden',
                        'sm:table-cell',
                    )}>
                        Artist
                    </th>
                    <th scope={'col'} className={'px-2 py-1 '}>
                        Duration
                    </th>
                    <th scope={'col'} className={clsx(
                        'px-2 py-1 hidden',
                        'md:table-cell',
                    )}>
                        Genre
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredSongs.map((song: Song) => {
                    return (
                        <tr key={song.id} className={'border-b last:border-none'}>
                            <td scope={'row'} className={'px-2 py-1'}>
                                {/* Play song on click */}
                                <span className={'hover:text-rose-500 cursor-pointer'}
                                      onClick={() => {
                                          dispatch(addSongToQueue(song));
                                          dispatch(setCurrentSong(song));
                                      }}>
                                    {song.title}
                                </span>
                            </td>
                            <td scope={'row'} className={clsx(
                                'px-2 py-1 hidden',
                                'sm:table-cell',
                            )}>
                                {song.album?.name}
                            </td>
                            <td scope={'row'} className={clsx(
                                'px-2 py-1 hidden',
                                'sm:table-cell',
                            )}>
                                {song.artist?.name}
                            </td>
                            <td scope={'row'} className={clsx(
                                'px-2 py-1',
                                'sm:table-cell',
                            )}>
                                {formatSongTime(song.duration)}
                            </td>
                            <td scope={'row'} className={clsx(
                                'px-2 py-1 hidden',
                                'md:table-cell',
                            )}>
                                {song.genre?.name}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}