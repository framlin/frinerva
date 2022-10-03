"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseInteractor = void 0;
class UseCaseInteractor {
    get helper() {
        return this._helper;
    }
    set helper(value) {
        this._helper = value;
    }
    execute(...data) { }
    get presenter() {
        return this._presenter;
    }
    set presenter(value) {
        this._presenter = value;
    }
}
exports.UseCaseInteractor = UseCaseInteractor;
module.exports = { UseCaseInteractor };
//# sourceMappingURL=UseCaseInteractor.js.map