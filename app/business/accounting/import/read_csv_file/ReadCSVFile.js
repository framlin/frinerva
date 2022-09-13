const UseCase = require("../../../use_case/UseCase");

class ReadCSVFile extends UseCase{
    constructor(UseCaseFactory) {
        super(UseCaseFactory, 'read_csv_file');
    }
}

module.exports = ReadCSVFile;