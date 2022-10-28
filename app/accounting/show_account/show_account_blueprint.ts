import {ShowAccountController} from "./ShowAccountController";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {ShowAccountPresenter} from "./ShowAccountPresenter";
import {ShowAccountInteractor} from "./ShowAccountInteractor";
import {ShowAccount} from "./ShowAccount";
import {ShowAccountView} from "./ui/ShowAccountView";

export const show_account_blueprint = {
    controller: ShowAccountController,
    helper: UseCaseHelper,
    interactor: ShowAccountInteractor,
    presenter: ShowAccountPresenter,
    usecase: ShowAccount,
    view: ShowAccountView
}