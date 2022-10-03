"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperFactory = void 0;
const Helper = require('./helper');
class HelperFactory {
    static create(use_case_name) {
        return new Helper[use_case_name]();
    }
}
exports.HelperFactory = HelperFactory;
module.exports = { HelperFactory };
//# sourceMappingURL=HelperFactory.js.map