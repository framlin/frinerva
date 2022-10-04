"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFileController = void 0;
const UseCaseController_1 = require("../../../common/use_case/UseCaseController");
const electron_1 = require("electron");
let controller;
class ReadCSVFileController extends UseCaseController_1.UseCaseController {
    constructor() {
        super();
        this._current_state = "";
        controller = this;
    }
    async execute(file_path) {
        if (this._interactor) {
            this._interactor.execute(file_path);
            this._current_state = "START";
        }
    }
    next(...data) {
        switch (this._current_state) {
            case "START":
                if (this._interactor) {
                    this._interactor.create_booking_entries();
                    this._current_state = "BOOKING_ENTRY_CREATION";
                }
                break;
            case "BOOKING_ENTRY_CREATION":
                this.forward('dispatch_booking_entries', ...data);
                this._current_state = "START";
        }
    }
    async on_use_case_view_ready() {
        const { canceled, filePaths } = await electron_1.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
        if (canceled) {
            await this.execute(null);
        }
        else {
            await this.execute(filePaths[0]);
        }
    }
    on_next(...data) {
        this.next(...data);
    }
}
exports.ReadCSVFileController = ReadCSVFileController;
electron_1.ipcMain.on('read_csv_file:next', (e, ...data) => {
    controller.on_next(...data);
});
module.exports = { ReadCSVFileController };
//# sourceMappingURL=ReadCSVFileController.js.map