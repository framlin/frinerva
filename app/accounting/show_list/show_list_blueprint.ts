import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {ShowListPresenter} from "./ShowListPresenter";
import {ShowListInteractor} from "./ShowListInteractor";
import {ShowList} from "./ShowList";
import {ShowListController} from "./ShowListController";
import {ShowListView} from "./ui/ShowListView";
import {Blueprint} from "../../common/use_case/Blueprint";

export const show_list_blueprint: Blueprint = {
    controller: ShowListController,
    helper: UseCaseHelper,
    interactor: ShowListInteractor,
    presenter: ShowListPresenter,
// @ts-ignore
    usecase: ShowList,
    view: ShowListView
}
