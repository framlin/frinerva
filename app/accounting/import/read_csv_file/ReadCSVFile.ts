import {UseCaseFactory} from "../../factories/UseCaseFactory";
import {UseCase} from "../../../common/use_case/UseCase";

class ReadCSVFile extends UseCase{
    constructor(_UseCaseFactory: UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'read_csv_file');
    }
}

module.exports = {ReadCSVFile};
export {ReadCSVFile}