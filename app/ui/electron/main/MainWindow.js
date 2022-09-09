const {BrowserWindow, ipcMain} = require('electron')
const path = require("path");

let main_window;
class MainWindow extends BrowserWindow{
    constructor() {
        super({
            width: 1024,
            height: 768,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        });
        main_window = this;
    }

    execute_use_case(use_case_name) {
        this._UseCaseFactory.create(use_case_name).execute();
    }

    _UseCaseFactory;


    get UseCaseFactory() {
        return this._UseCaseFactory;
    }

    set UseCaseFactory(value) {
        this._UseCaseFactory = value;
    }
}

ipcMain.on('main:import', () => {
    main_window.execute_use_case('read_csv_file');
})

module.exports = MainWindow;