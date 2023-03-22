export function formatSongTime(timeSeconds: number) {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = Math.round(timeSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
}