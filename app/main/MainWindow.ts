import {BrowserWindow, ipcMain} from 'electron';
const path = require("path");

let main_window: MainWindow;

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

    _UseCaseFactory: any;

    set UseCaseFactory(value: any) {
        this._UseCaseFactory = value;
    }

    execute_use_case(domain_name: string, use_case_name: string) {
        // @ts-ignore
        let use_case = this._domains[domain_name].create_use_case(use_case_name);
        use_case.execute();
    }

    add_domain(domain: any) {
        // @ts-ignore
        this._domains[domain.domain_name] = domain;
    }
}

ipcMain.on('use_case:create', (e, domain_name, use_case_name) => {
    main_window.execute_use_case(domain_name, use_case_name);
});

module.exports = MainWindow;
export {MainWindow}