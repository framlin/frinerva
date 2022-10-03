import {WebContents} from 'electron';
import {UseCaseController} from "./UseCaseController";

const {ipcMain} = require('electron');
let presenter: UseCasePresenter;

class UseCasePresenter{

    constructor(ipc_chanel: WebContents) {
        this._ipc_channel = ipc_chanel;
        presenter = this;
    }

    show(...data: any[]){}

    execute(use_case_name: string, ...data: any[]) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }

    forward(domain_name: string, use_case_name: string) {
        if (this._controller)  this._controller.forward(domain_name, use_case_name);
    }

    get controller(): UseCaseController|undefined {
        return this._controller;
    }

    set controller(value: UseCaseController|undefined) {
        this._controller = value;
    }

    on_use_case_view_ready(...data: any[]) {
        if (this._controller)  this._controller.execute(...data);
    }

    _ipc_channel : WebContents;
    _controller: UseCaseController | undefined;
}

ipcMain.on('use_case:view_ready', (e, domain_name, use_case_name, ...data) => {
    presenter.on_use_case_view_ready(...data)
})

module.exports = {UseCasePresenter};
export {UseCasePresenter}