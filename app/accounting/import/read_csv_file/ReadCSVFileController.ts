import {UseCaseController} from "../../../common/use_case/UseCaseController";
import {ReadCSVFileInteractor} from "./ReadCSVFileInteractor";
import {dialog, ipcMain} from "electron";

let controller: ReadCSVFileController;
class ReadCSVFileController extends UseCaseController {
    _current_state: string = "";

    constructor() {
        super();
        controller = this;
    }

    async execute(file_path: string|null) {
        if (this._request_boundary) {
            this._request_boundary.execute(file_path);
            this._current_state = "START"
        }
    }

    next(...data:any[]) {
        switch (this._current_state) {
            case "START":
                if (this._request_boundary) {
                    (this._request_boundary as unknown as ReadCSVFileInteractor).create_booking_entries();
                    this._current_state = "BOOKING_ENTRY_CREATION";
                }
                break;
            case "BOOKING_ENTRY_CREATION":
                this.forward('dispatch_booking_entries', ...data);
                this._current_state = "START"
        }

    }
    async on_use_case_view_ready() {
        const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
        if (canceled) {
            await this.execute(null);
        } else {
            await this.execute(filePaths[0]);
        }
    }

    on_next(...data: any[]) {
        this.next(...data);
    }


}

ipcMain.on('read_csv_file:next', (e, ...data) => {
    controller.on_next(...data)
});

module.exports = {ReadCSVFileController};
export {ReadCSVFileController}
