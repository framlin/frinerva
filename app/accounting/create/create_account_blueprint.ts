import {CreateAccountHelper} from "./CreateAccountHelper";
import {CreateAccountController} from "./CreateAccountController";
import {CreateAccountView} from "./ui/CreateAccountView";
import {CreateAccount} from "./CreateAccount";
import {CreateAccountInteractor} from "./CreateAccountInteractor";
import {CreateAccountPresenter} from "./CreateAccountPresenter";

export const create_account_blueprint = {
    controller: CreateAccountController,
    helper: CreateAccountHelper,
    interactor: CreateAccountInteractor,
    presenter: CreateAccountPresenter,
    usecase: CreateAccount,
    view: CreateAccountView
}