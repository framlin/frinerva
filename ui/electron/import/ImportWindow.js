const {BrowserWindow, dialog, ipcMain} = require('electron')
const path = require("path");

let import_window;

class ImportWindow extends BrowserWindow {
    constructor(parent, csv_file_import, booking_entry_dispatch) {
        super({
            width: 800,
            height: 600,
            parent: parent,
            webPreferences: {
                preload: path.join(__dirname, 'ImportPreloader.js')
            }
        });

        this.loadFile(path.join(__dirname, 'import.html')).then(() => {
            this.webContents.openDevTools();

            dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
                .then(this.onFileSelected.bind(this));

        });

        this.USE_CASES = {csv_file_import, booking_entry_dispatch};
        import_window = this;
    }

    onFileSelected(result) {
        this.webContents.send('file:selected', result.filePaths[0]);
    }



}


ipcMain.on('import:commited', (event, booking_records) => {
    import_window.loadURL(`file://${__dirname}/dispatch.html`).then(() => {
        import_window.webContents.send('import:dispatch', booking_records);
        // import_window.USE_CASES.booking_entry_dispatch.controller.dispatch(booking_records);
    });
});

ipcMain.on('dispatch:commited', (event) => {
    import_window.USE_CASES.booking_entry_dispatch.presenter.dispatch_commited();
});


module.exports = ImportWindow;