import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {ShowListPresenter} from "./ShowListPresenter";
import {ShowListInteractor} from "./ShowListInteractor";
import {ShowList} from "./ShowList";
import {ShowListController} from "./ShowListController";
import {ShowListView} from "./ui/ShowListView";

export const show_list_blueprint = {
    controller: ShowListController,
    helper: UseCaseHelper,
    interactor: ShowListInteractor,
    presenter: ShowListPresenter,
    usecase: ShowList,
    view: ShowListView
}
