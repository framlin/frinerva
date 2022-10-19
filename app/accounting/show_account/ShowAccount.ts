import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseFactory} from "../factories/UseCaseFactory";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

export class ShowAccount extends UseCase {

    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, 'accounting', 'show_account', presenter);
    }

    // async execute() {
    //     // ...
    // }

}
