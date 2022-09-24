const UseCase = require("../../common/use_case/UseCase");

class ShowList  extends UseCase{
    constructor(UseCaseFactory) {
        super(UseCaseFactory, 'accounting', 'show_list');
    }
}

module.exports = ShowList;