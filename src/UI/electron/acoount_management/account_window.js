const {BrowserWindow, dialog} = require('electron')
const path = require("path");

class AccountWindow extends BrowserWindow {
    constructor(parent) {
        super({
            width: 800,
            height: 600,
            parent: parent,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        });

        this.loadFile(path.join(__dirname, 'account.html')).then(() => {
            this.webContents.openDevTools();
        });

    }
}

module.exports = AccountWindow;