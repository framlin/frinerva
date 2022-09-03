const UseCaseView = require("../../use_case/UseCaseView");
const path = require("path");
const {ipcMain} = require("electron");

let read_csv_file_view;
class ReadCSVFileView extends UseCaseView{
    constructor() {
        super(path.join(__dirname, 'ReadCSVFilePreloader.js'));
        read_csv_file_view = this;
    }
}

ipcMain.on('read-csv-file:import', () => {
    read_csv_file_view.forward('read_csv_file');
});
module.exports = ReadCSVFileView;