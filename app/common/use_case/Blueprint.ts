import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseController} from "./UseCaseController";
import {UseCaseView} from "../ui/use_case/UseCaseView";
import {UseCase} from "./UseCase";
import {TUseCaseInteractorConstructor} from "./TUseCaseInteractorConstructor";
import {TUseCasePresenterConstructor} from "./TUseCasePresenterConstructor";

export interface Blueprint {
    controller: typeof UseCaseController,
    helper: typeof UseCaseHelper,
    interactor:  TUseCaseInteractorConstructor,
    presenter: TUseCasePresenterConstructor,
    usecase: typeof UseCase,
    view: typeof UseCaseView
}