const UseCase = require("../../../common/use_case/UseCase");

class ReadCSVFile extends UseCase{
    constructor(UseCaseFactory) {
        super(UseCaseFactory, 'accounting', 'read_csv_file');
    }
}

module.exports = ReadCSVFile;