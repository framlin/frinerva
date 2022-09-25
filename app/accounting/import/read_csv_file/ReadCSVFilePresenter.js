const UseCasePresenter = require("../../../common/use_case/UseCasePresenter");
const {ipcMain, dialog} = require("electron");

let presenter;

class ReadCSVFilePresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show_payments(payments) {
        this._ipc_channel.send('read_csv_file:show_payments', payments);
    }

    on_next(...data) {
        this._controller.next(...data);
    }

    show_booking_records(booking_records) {
        this._ipc_channel.send('read_csv_file:show_booking_records', booking_records);
    }

    async on_use_case_view_ready() {
        const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
        if (canceled) {
            this._controller.execute(null);
        } else {
            this._controller.execute(filePaths[0]);
        }
    }
}


ipcMain.on('read_csv_file:next', (e, ...data) => {
    presenter.on_next(...data)
});

module.exports = ReadCSVFilePresenter;