"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseController = void 0;
class UseCaseController {
    execute(...data) {
        if (this._interactor)
            this._interactor.execute(...data);
    }
    forward(use_case_name, ...data) {
        if (this._use_case)
            this._use_case.forward(use_case_name, ...data);
    }
    get interactor() {
        return this._interactor;
    }
    set interactor(value) {
        this._interactor = value;
    }
    get use_case() {
        return this._use_case;
    }
    set use_case(value) {
        this._use_case = value;
    }
}
exports.UseCaseController = UseCaseController;
module.exports = UseCaseController;
//# sourceMappingURL=UseCaseController.js.map