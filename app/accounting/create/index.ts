import {Blueprint} from "../../common/use_case/Blueprint";
import {CreateAccount} from "./CreateAccount";
import {CreateAccountController} from "./CreateAccountController";
import {CreateAccountHelper} from "./CreateAccountHelper";
import {CreateAccountInteractor} from "./CreateAccountInteractor";
import {CreateAccountPresenter} from "./CreateAccountPresenter";
import {CreateAccountView} from "./ui/CreateAccountView";

export const create_account: Blueprint = {
    controller: CreateAccountController,
    helper: CreateAccountHelper,
    interactor: CreateAccountInteractor,
    presenter: CreateAccountPresenter,
    usecase: CreateAccount,
    view: CreateAccountView
}