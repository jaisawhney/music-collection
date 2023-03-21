import { clsx } from 'clsx';

export default function Thumbnail(props: { image?: string, className?: string }) {
    const image = props.image;
    const className = props.className;

    return (
        <img src={image || '/uploads/covers/default.png'}
             className={clsx(
                 'select-none object-cover pointer-events-none rounded-md',
                 className,
             )}
             alt='Thumbnail Icon' />
    );
}