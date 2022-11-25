import {Blueprint} from "../../../common/usecase/Blueprint";
import {ShowListController} from "./ShowListController";
import {ShowListInteractor} from "./ShowListInteractor";
import {ShowListPresenter} from "./ShowListPresenter";
import {ShowListView} from "./ui/ShowListView";

export const show_list: Blueprint = {
    controller: ShowListController,
    interactor: ShowListInteractor,
    presenter: ShowListPresenter,
    view: ShowListView
}
