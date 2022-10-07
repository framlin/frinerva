"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindow = void 0;
const electron_1 = require("electron");
const path = __importStar(require("path"));
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