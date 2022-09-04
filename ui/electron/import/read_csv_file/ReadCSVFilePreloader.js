const {ipcRenderer} = require('electron');
window.addEventListener('DOMContentLoaded', () => {
    let next_button = document.querySelector("#read-csv-file-next");
    next_button.addEventListener('click', (e) => {
        ipcRenderer.send('read-csv-file:next');
    });
});
