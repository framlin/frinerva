"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCasePresenter = void 0;
class UseCasePresenter {
    constructor(ipc_chanel) {
        this._ipc_channel = ipc_chanel;
    }
    show(...data) { }
    execute(use_case_name, ...data) {
        this._ipc_channel.send('use_case:created', use_case_name, ...data);
    }
}
exports.UseCasePresenter = UseCasePresenter;
module.exports = { UseCasePresenter };
//# sourceMappingURL=UseCasePresenter.js.map