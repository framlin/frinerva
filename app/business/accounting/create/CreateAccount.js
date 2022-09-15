const UseCase = require("../../use_case/UseCase");

class CreateAccount extends UseCase{
    constructor(UseCaseFactory) {
        super(UseCaseFactory, 'create_account');
    }
}

module.exports = CreateAccount;
