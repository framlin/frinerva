const {BrowserWindow, ipcMain} = require('electron')
const path = require("path");

let main_window;

class MainWindow extends BrowserWindow {
    _domains = {};

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

    _UseCaseFactory;

    set UseCaseFactory(value) {
        this._UseCaseFactory = value;
    }

    execute_use_case(domain_name, use_case_name) {
        let use_case = this._domains[domain_name].create_use_case(use_case_name);
        use_case.execute();
    }

    add_domain(domain) {
        this._domains[domain.domain_name] = domain;
    }
}

ipcMain.on('use_case:create', (e, domain_name, use_case_name) => {
    main_window.execute_use_case(domain_name, use_case_name);
});

module.exports = MainWindow;