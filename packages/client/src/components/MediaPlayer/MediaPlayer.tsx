export default function MediaPlayer() {

    return (
        <>
            <audio controls>
                <source src='http://localhost:3000/api/stream/f9b6fd325ed22a4d00ece2e5417b5c43' type='audio/mpeg' />
                Your browser does not support the audio element
            </audio>

        </>
    );
}