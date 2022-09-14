const UseCaseController = require("../../../use_case/UseCaseController");

class ReadCSVFileController extends UseCaseController {
    execute(file_name) {
        this._interactor.execute(file_name);
    }
}

module.exports = ReadCSVFileController;