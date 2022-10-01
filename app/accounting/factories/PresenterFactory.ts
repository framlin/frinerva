import WebContents = Electron.WebContents;

const Presenter = require('./presenter');
class PresenterFactory{
    static create(use_case_name: string, ipc_channel: WebContents) {
        return new Presenter[use_case_name](ipc_channel);
    }
}

module.exports = PresenterFactory;
export {PresenterFactory}


