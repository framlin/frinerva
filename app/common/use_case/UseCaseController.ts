import {UseCaseInteractor} from "./UseCaseInteractor";
import {UseCase} from "./UseCase";
import {ipcMain} from "electron";
import {UseCaseRequestBoundary} from "./UseCaseRequestBoundary";

let controller: UseCaseController;

class UseCaseController{
    constructor() {
        controller = this;
    }
    execute(...data: any[]) {
        if ( this._request_boundary) this._request_boundary.execute(...data)
    }

    forward(use_case_name: string, ... data: any[]){
       if ( this._use_case)  this._use_case.forward(use_case_name, ... data);
    }

    get request_boundary() {
        return this._request_boundary;
    }

    set request_boundary(value) {
        this._request_boundary = value;
    }

    get use_case() {
        return this._use_case;
    }

    set use_case(value) {
        this._use_case = value;
    }

    on_use_case_view_ready(...data: any[]) {
        this.execute(...data);
    }

    _request_boundary: UseCaseRequestBoundary | undefined;
    _use_case: UseCase | undefined;

}
ipcMain.on('use_case:view_ready', (e, _domain_name, _use_case_name, ...data) => {
    controller.on_use_case_view_ready(...data)
})

module.exports = {UseCaseController};
export {UseCaseController}