const UseCaseView = require("../../../use_case/UseCaseView");
const {ipcMain, ipcRenderer} = require("electron");

let read_csv_file_view;

class ReadCSVFileView extends UseCaseView {
    constructor() {
        super();
        read_csv_file_view = this;

        window.addEventListener('DOMContentLoaded', () => {
            let next_button = document.querySelector("#read-csv-file-next");
            next_button.addEventListener('click', (e) => {
                ipcRenderer.send('read-csv-file:next');
            });
        });
    }
}

ipcMain.on('read-csv-file:import', () => {
    read_csv_file_view.forward('read_csv_file');
});

module.exports = ReadCSVFileView;