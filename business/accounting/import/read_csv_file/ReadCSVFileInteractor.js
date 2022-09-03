const UseCaseInteractor = require("../../../use_case/UseCaseInteractor");

class ReadCSVFileInteractor extends UseCaseInteractor{
    execute() {
        console.log("READ_CSV_FILE_INTERACTOR");
    }
}

module.exports = ReadCSVFileInteractor;