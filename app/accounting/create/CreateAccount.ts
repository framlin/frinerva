import {UseCaseFactory} from "../factories/UseCaseFactory";

const UseCase = require("../../common/use_case/UseCase");

class CreateAccount extends UseCase{
    constructor(_UseCaseFactory: UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'create_account');
    }
}

module.exports = {CreateAccount};
export {CreateAccount}
