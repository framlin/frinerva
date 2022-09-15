const UseCasePresenter = require("../../../use_case/UseCasePresenter");
const {ipcMain} = require("electron");

let presenter;

class ReadCSVFilePresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show_payments(payments) {
        this._ipc_channel.send('read_csv_file:show_payments', payments);
    }

    on_next() {
        this._controller.next();
    }

    show_booking_records(booking_records) {
        this._ipc_channel.send('read_csv_file:show_booking_records', booking_records);
    }
}


ipcMain.on('read_csv_file:next', () => {
    presenter.on_next()
});

module.exports = ReadCSVFilePresenter;