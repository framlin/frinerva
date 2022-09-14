const {ipcMain, dialog} = require('electron');
class UseCasePresenter{
    constructor(ipc_chanel) {
        this._ipc_channel = ipc_chanel;
    }


    execute(use_case_name) {
        this._ipc_channel.send('use_case:created', use_case_name);
        ipcMain.on('use_case:view_ready', () => {
            this._controller.execute();
        })
    }

    forward(use_case_name) {
        this._controller.forward(use_case_name);
    }


    _ipc_channel;
    _controller;

    get controller() {
        return this._controller;
    }

    set controller(value) {
        this._controller = value;
    }

    static async handleFileOpen() {
        const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openFile', 'multiSelections']})
        if (canceled) {
            return;
        } else {
            return filePaths[0];
        }
    }



}
ipcMain.handle('dialog:openFile', UseCasePresenter.handleFileOpen);

module.exports = UseCasePresenter;