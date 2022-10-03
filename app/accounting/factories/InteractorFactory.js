"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractorFactory = void 0;
const Interactors = require('./interactors');
class InteractorFactory {
    static create(use_case_name) {
        return new Interactors[use_case_name]();
    }
}
exports.InteractorFactory = InteractorFactory;
module.exports = { InteractorFactory };
//# sourceMappingURL=InteractorFactory.js.map