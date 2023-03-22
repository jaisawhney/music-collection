export default function Settings() {

    function updateSettings() {
        fetch('/api/settings', {
            method: 'POST'
        }).then(r => console.log(r));
    }

    return (
        <div>
            <button onClick={updateSettings} type={'submit'}>Save & Refresh Media</button>
        </div>
    );
}