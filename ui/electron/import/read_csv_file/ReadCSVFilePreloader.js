const {ipcRenderer} = require('electron');
window.addEventListener('DOMContentLoaded', () => {
    let import_button = document.querySelector("#import");
    import_button.addEventListener('click', (e) => {
        ipcRenderer.send('read-csv-file:import');
    });
});
