import {UseCaseFactory} from "../factories/UseCaseFactory";
import {UseCase}  from "../../common/use_case/UseCase";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

class ShowList  extends UseCase{
    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, 'accounting', 'show_list', presenter);
    }
}

module.exports = {ShowList};
export {ShowList}