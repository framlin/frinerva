import {Blueprint} from "../../../common/use_case/Blueprint";
import {UseCaseHelper} from "../../../common/use_case/UseCaseHelper";
import {ShowAccountController} from "./ShowAccountController";
import {ShowAccountInteractor} from "./ShowAccountInteractor";
import {ShowAccountPresenter} from "./ShowAccountPresenter";
import {ShowAccountView} from "./ui/ShowAccountView";
import {UseCase} from "../../../common/use_case/UseCase";

export const show_account: Blueprint = {
    controller: ShowAccountController,
    helper: UseCaseHelper,
    interactor: ShowAccountInteractor,
    presenter: ShowAccountPresenter,
    usecase: UseCase,
    view: ShowAccountView
}