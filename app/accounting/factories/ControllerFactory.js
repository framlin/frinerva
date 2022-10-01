"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerFactory = void 0;
const Controller = require('./controller');
class ControllerFactory {
    static create(use_case_name) {
        return new Controller[use_case_name]();
    }
}
exports.ControllerFactory = ControllerFactory;
module.exports = ControllerFactory;
//# sourceMappingURL=ControllerFactory.js.map