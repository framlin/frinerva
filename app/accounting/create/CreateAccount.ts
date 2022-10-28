import {UseCaseFactory} from "../factories/UseCaseFactory";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

const {UseCase} = require("../../common/use_case/UseCase");

export class CreateAccount extends UseCase{
    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, 'accounting', 'create_account', presenter);
    }
}

