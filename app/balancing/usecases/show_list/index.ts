import {Blueprint} from "../../../common/usecase/Blueprint";
import {UseCaseHelper} from "../../../common/usecase/UseCaseHelper";
import {ShowListController} from "./ShowListController";
import {ShowListInteractor} from "./ShowListInteractor";
import {ShowListPresenter} from "./ShowListPresenter";
import {ShowListView} from "./ui/ShowListView";
import {UseCase} from "../../../common/usecase/UseCase";

export const show_list: Blueprint = {
    controller: ShowListController,
    helper: UseCaseHelper,
    interactor: ShowListInteractor,
    presenter: ShowListPresenter,
    usecase: UseCase,
    view: ShowListView
}
