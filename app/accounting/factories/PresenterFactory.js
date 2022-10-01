"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenterFactory = void 0;
const Presenter = require('./presenter');
class PresenterFactory {
    static create(use_case_name, ipc_channel) {
        return new Presenter[use_case_name](ipc_channel);
    }
}
exports.PresenterFactory = PresenterFactory;
module.exports = PresenterFactory;
//# sourceMappingURL=PresenterFactory.js.map