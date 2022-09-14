const UseCasePresenter = require("../../../use_case/UseCasePresenter");
const {dialog, ipcMain} = require("electron");

class ReadCSVFilePresenter extends UseCasePresenter {

    async execute(use_case_name) {
        this._ipc_channel.send('use_case:created', use_case_name);
        ipcMain.on('use_case:view_ready', async () => {
            let file_name = await UseCasePresenter.handleFileOpen();
            this._controller.execute(file_name);
        });
    }

    show_payments(payments) {
        console.log("PRESNETER SHOW PAYMENTS")
        this._ipc_channel.send('read_csv_file:show_payments', payments);
    }
}

module.exports = ReadCSVFilePresenter;