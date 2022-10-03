import {UseCaseFactory} from "../factories/UseCaseFactory";
import {UseCase}  from "../../common/use_case/UseCase";

class ShowList  extends UseCase{
    constructor(_UseCaseFactory: UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'show_list');
    }
}

module.exports = {ShowList};
export {ShowList}