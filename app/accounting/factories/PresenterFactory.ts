import WebContents = Electron.WebContents;

import {Presenter}  from './presenter';
class PresenterFactory{
    static create(use_case_name: string, ipc_channel: WebContents) {
        // @ts-ignore
        return new Presenter[use_case_name](ipc_channel);
    }
}

module.exports = {PresenterFactory};
export {PresenterFactory}


