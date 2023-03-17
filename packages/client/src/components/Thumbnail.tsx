export default function Thumbnail(props: { image?: string }) {
    const image = props.image;

    return (
        <img src={image || '/uploads/covers/default.png'}
             className={'select-none object-cover pointer-events-none rounded-md bg-gray-100 mb-1'}
             alt='Thumbnail Icon' />
    );
}