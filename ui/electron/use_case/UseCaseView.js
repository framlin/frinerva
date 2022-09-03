const {BrowserWindow} = require('electron')
const path = require("path");

class UseCaseView extends BrowserWindow{

    constructor(preloader_path) {
        console.log(preloader_path);
        super({
            width: 1024,
            height: 786,
            show: false,
            webPreferences: {
                preload: preloader_path
            }
        });
    }
}

module.exports = UseCaseView;