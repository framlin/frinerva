"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseInteractor = void 0;
class UseCaseInteractor {
    constructor(domain_entyty) {
        this._domain_entity = domain_entyty;
    }
    get helper() {
        return this._helper;
    }
    set helper(value) {
        this._helper = value;
    }
    get response_boundary() {
        return this._response_boundary;
    }
    set response_boundary(value) {
        this._response_boundary = value;
    }
}
exports.UseCaseInteractor = UseCaseInteractor;
module.exports = { UseCaseInteractor };
//# sourceMappingURL=UseCaseInteractor.js.map