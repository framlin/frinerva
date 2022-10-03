"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccount = void 0;
const UseCase = require("../../common/use_case/UseCase");
class CreateAccount extends UseCase {
    constructor(_UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'create_account');
    }
}
exports.CreateAccount = CreateAccount;
module.exports = { CreateAccount };
//# sourceMappingURL=CreateAccount.js.map