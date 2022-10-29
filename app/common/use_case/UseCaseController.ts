import {UseCase} from "./UseCase";
import {ipcMain} from "electron";
import {UseCaseRequestBoundary} from "./UseCaseRequestBoundary";
import {Subscribing} from "../observation/Subscribing";
import {Observatory} from "../observation/Observatory";
import {register_IPCMain_listener} from "../ui/ipc/register_IPCMain_listener";

let controller: UseCaseController;

class UseCaseController implements Subscribing {
    constructor(
        protected _request_boundary: UseCaseRequestBoundary,
        protected _use_case: UseCase
    ) {
        controller = this;
        this.register_ipc_listener();
    }

    protected register_ipc_listener() {
        register_IPCMain_listener('use_case:view_ready', (e, _domain_name, _use_case_name, ...data) => {
            this.on_use_case_view_ready(...data)
        });
    }

    execute(...data: any[]) {
        if (this._request_boundary) this._request_boundary.execute(...data)
    }

    forward(use_case_name: string, ...data: any[]) {
        if (this._use_case) this._use_case.forward(use_case_name, ...data);
    }

    subscribe_at(observatory: Observatory): void {
        //intentionally left blank
    }

    get request_boundary() {
        return this._request_boundary;
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
}

module.exports = {UseCaseController};
export {UseCaseController}