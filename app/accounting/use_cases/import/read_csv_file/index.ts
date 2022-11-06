import {Blueprint} from "../../../../common/use_case/Blueprint";
import {ReadCSVFileController} from "./ReadCSVFileController";
import {ReadCSVFileHelper} from "./ReadCSVFileHelper";
import {ReadCSVFileInteractor} from "./ReadCSVFileInteractor";
import {ReadCSVFilePresenter} from "./ReadCSVFilePresenter";
import {ReadCSVFileView} from "./ui/ReadCSVFileView";
import {UseCase} from "../../../../common/use_case/UseCase";

export const read_csv_file: Blueprint = {
    controller: ReadCSVFileController,
    helper: ReadCSVFileHelper,
    interactor: ReadCSVFileInteractor,
    presenter: ReadCSVFilePresenter,
    usecase: UseCase,
    view: ReadCSVFileView
}