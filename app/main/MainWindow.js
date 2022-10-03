"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindow = void 0;
const electron_1 = require("electron");
const path = require("path");
let main_window;
class MainWindow extends electron_1.BrowserWindow {
    constructor() {
        super({
            width: 1024,
            height: 768,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            },
            show: false
        });
        this._domains = {};
        main_window = this;
    }
    set UseCaseFactory(value) {
        this._UseCaseFactory = value;
    }
    execute_use_case(domain_name, use_case_name) {
        // @ts-ignore
        let use_case = this._domains[domain_name].create_use_case(use_case_name);
        use_case.execute();
    }
    add_domain(domain) {
        // @ts-ignore
        this._domains[domain.domain_name] = domain;
    }
}
exports.MainWindow = MainWindow;
electron_1.ipcMain.on('use_case:create', (e, domain_name, use_case_name) => {
    main_window.execute_use_case(domain_name, use_case_name);
});
module.exports = { MainWindow };
//# sourceMappingURL=MainWindow.js.map