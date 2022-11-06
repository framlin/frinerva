import {Blueprint} from "../../../common/use_case/Blueprint";
import {CreateAccountController} from "./CreateAccountController";
import {CreateAccountHelper} from "./CreateAccountHelper";
import {CreateAccountInteractor} from "./CreateAccountInteractor";
import {CreateAccountPresenter} from "./CreateAccountPresenter";
import {CreateAccountView} from "./ui/CreateAccountView";
import {UseCase} from "../../../common/use_case/UseCase";

export const create_account: Blueprint = {
    controller: CreateAccountController,
    helper: CreateAccountHelper,
    interactor: CreateAccountInteractor,
    presenter: CreateAccountPresenter,
    usecase: UseCase,
    view: CreateAccountView
}