import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {ShowList} from "./ShowList";
import {ShowListController} from "./ShowListController";
import {ShowListInteractor} from "./ShowListInteractor";
import {ShowListPresenter} from "./ShowListPresenter";
import {ShowListView} from "./ui/ShowListView";

export const show_list: Blueprint = {
    controller: ShowListController,
    helper: UseCaseHelper,
    interactor: ShowListInteractor,
    presenter: ShowListPresenter,
    usecase: ShowList,
    view: ShowListView
}
