import {UseCaseFactory} from "../factories/UseCaseFactory";
import {UseCasePresenter} from "../../common/use_case/UseCasePresenter";

import  {UseCase} from"../../common/use_case/UseCase";

export class CreateAccount extends UseCase{
    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, presenter, 'accounting', 'create_account');
    }
}

