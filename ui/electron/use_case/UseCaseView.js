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

    forward(use_case_name) {
        this._presenter.forward(use_case_name);
    }

    _presenter;
    get presenter() {
        return this._presenter;
    }

    set presenter(value) {
        this._presenter = value;
    }
}

module.exports = UseCaseView;