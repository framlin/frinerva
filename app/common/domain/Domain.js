"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
class Domain {
    constructor(domain_name, factories) {
        this._domain_name = domain_name;
        this._factories = factories;
    }
    get domain_name() {
        return this._domain_name;
    }
    create_use_case(use_case_name) {
        return this._factories.use_case.create(use_case_name);
    }
}
exports.Domain = Domain;
module.exports = { Domain };
//# sourceMappingURL=Domain.js.map