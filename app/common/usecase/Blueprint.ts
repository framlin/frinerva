import {UseCaseHelper} from "./UseCaseHelper";
import {UseCaseController} from "./UseCaseController";
import {UseCaseView} from "../ui/usecase/UseCaseView";
import {UseCase} from "./UseCase";
import {UseCaseInteractorConstructor} from "./UseCaseInteractorConstructor";
import {UseCasePresenterConstructor} from "./UseCasePresenterConstructor";

export interface Blueprint {
    controller: typeof UseCaseController,
    helper: typeof UseCaseHelper,
    interactor:  UseCaseInteractorConstructor,
    presenter: UseCasePresenterConstructor,
    usecase: typeof UseCase,
    view: typeof UseCaseView
}