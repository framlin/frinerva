import {UseCaseFactory} from "../factories/UseCaseFactory";

const UseCase = require("../../common/use_case/UseCase");

class ShowList  extends UseCase{
    constructor(_UseCaseFactory: UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'show_list');
    }
}

module.exports = {ShowList};
export {ShowList}