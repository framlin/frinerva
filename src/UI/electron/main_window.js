const {BrowserWindow} = require('electron')
const path = require("path");

class MainWindow extends BrowserWindow{
    constructor() {
        super({
            width: 1024,
            height: 768,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        this.loadFile(path.join(__dirname, 'index.html')).then(() => {
            this.webContents.openDevTools();
        });
    }

}

module.exports = MainWindow;