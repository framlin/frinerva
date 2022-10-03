import {UseCaseFactory} from "../../factories/UseCaseFactory";
const UseCase = require("../../../common/use_case/UseCase");

class ReadCSVFile extends UseCase{
    constructor(_UseCaseFactory: UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'read_csv_file');
    }
}

module.exports = {ReadCSVFile};
export {ReadCSVFile}