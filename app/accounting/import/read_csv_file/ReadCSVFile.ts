import {UseCaseFactory} from "../../factories/UseCaseFactory";
import {UseCase} from "../../../common/use_case/UseCase";
import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";

class ReadCSVFile extends UseCase{
    constructor(_UseCaseFactory: typeof UseCaseFactory, presenter: UseCasePresenter) {
        super(_UseCaseFactory, 'accounting', 'read_csv_file', presenter);
    }
}

module.exports = {ReadCSVFile};
export {ReadCSVFile}