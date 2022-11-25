import {Blueprint} from "../../../common/usecase/Blueprint";
import {ShowAccountController} from "./ShowAccountController";
import {ShowAccountInteractor} from "./ShowAccountInteractor";
import {ShowAccountPresenter} from "./ShowAccountPresenter";
import {ShowAccountView} from "./ui/ShowAccountView";

export const show_account: Blueprint = {
    controller: ShowAccountController,
    interactor: ShowAccountInteractor,
    presenter: ShowAccountPresenter,
    view: ShowAccountView
}