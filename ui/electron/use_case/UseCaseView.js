const {BrowserWindow} = require('electron')
const path = require("path");

class UseCaseView extends BrowserWindow{

    constructor(preloader_path, config) {
        console.log(preloader_path);
        let win_config = {
            width: 1024,
            height: 786,
            show: false,
            webPreferences: {
                preload: preloader_path
            }
        }
        UseCaseView._merge_config(win_config, config)
        super(win_config);
    }

   static  _merge_config(win_config, config) {
        for (let param in config) {
            win_config[param] = config[param];
        }
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