import {Blueprint} from "../../../common/usecase/Blueprint";
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
    view: CreateAccountView
}