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
            },
            show: false
        });
        main_window = this;
    }

    execute_use_case(use_case_name) {
        let use_case = this._UseCaseFactory.create(use_case_name);
        use_case.execute();
    }

    _UseCaseFactory;

    set UseCaseFactory(value) {
        this._UseCaseFactory = value;
    }
}

ipcMain.on('use_case:create', (e, use_case_name) => {
    main_window.execute_use_case(use_case_name);
});

module.exports = MainWindow;