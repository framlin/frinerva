import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseController} from "./UseCaseController";
import {UseCaseView} from "../ui/use_case/UseCaseView";
import {UseCase} from "./UseCase";
import {UseCaseInteractor} from "./UseCaseInteractor";
import {UseCasePresenter} from "./UseCasePresenter";

export interface Blueprint {
    controller: typeof UseCaseController,
    helper: typeof UseCaseHelper,
    interactor: typeof UseCaseInteractor,
    presenter: typeof UseCasePresenter,
    usecase: typeof UseCase,
    view: typeof UseCaseView
}