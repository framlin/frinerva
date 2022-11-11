import {Blueprint} from "../../../common/usecase/Blueprint";
import {UseCaseHelper} from "../../../common/usecase/UseCaseHelper";
import {ShowAccountController} from "./ShowAccountController";
import {ShowAccountInteractor} from "./ShowAccountInteractor";
import {ShowAccountPresenter} from "./ShowAccountPresenter";
import {ShowAccountView} from "./ui/ShowAccountView";
import {UseCase} from "../../../common/usecase/UseCase";

export const show_account: Blueprint = {
    controller: ShowAccountController,
    helper: UseCaseHelper,
    interactor: ShowAccountInteractor,
    presenter: ShowAccountPresenter,
    usecase: UseCase,
    view: ShowAccountView
}