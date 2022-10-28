import {ReadCSVFileController} from "./ReadCSVFileController";
import {ReadCSVFile} from "./ReadCSVFile";
import {ReadCSVFileHelper} from "./ReadCSVFileHelper";
import {ReadCSVFileInteractor} from "./ReadCSVFileInteractor";
import {ReadCSVFilePresenter} from "./ReadCSVFilePresenter";
import {ReadCSVFileView} from "./ui/ReadCSVFileView";

export const read_csv_file_blueprint = {
    controller: ReadCSVFileController,
    helper: ReadCSVFileHelper,
    interactor: ReadCSVFileInteractor,
    presenter: ReadCSVFilePresenter,
    usecase: ReadCSVFile,
    view: ReadCSVFileView
}