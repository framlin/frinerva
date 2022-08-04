const {BrowserWindow, dialog} = require('electron')
const path = require("path");

class ImportWindow extends BrowserWindow {
    constructor(parent) {
        super({
            width: 800,
            height: 600,
            parent: parent,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        });

        this.loadFile(path.join(__dirname, 'import.html')).then(() => {
            this.webContents.openDevTools();

            dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
                .then(this.onFileSelected.bind(this));


        });
    }

    onFileSelected(result) {
        this.webContents.send('file:selected', result.filePaths[0]);
    }

}

module.exports = ImportWindow;