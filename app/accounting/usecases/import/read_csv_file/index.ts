import {Blueprint} from "../../../../common/usecase/Blueprint";
import {ReadCSVFileController} from "./ReadCSVFileController";
import {ReadCSVFileHelper} from "./ReadCSVFileHelper";
import {ReadCSVFileInteractor} from "./ReadCSVFileInteractor";
import {ReadCSVFilePresenter} from "./ReadCSVFilePresenter";
import {ReadCSVFileView} from "./ui/ReadCSVFileView";

export const read_csv_file: Blueprint = {
    controller: ReadCSVFileController,
    helper: ReadCSVFileHelper,
    interactor: ReadCSVFileInteractor,
    presenter: ReadCSVFilePresenter,
    view: ReadCSVFileView
}