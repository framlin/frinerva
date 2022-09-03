const ReadCSVFileController = require("../use_cases/import/read_csv_file/ReadCSVFileController");
const controllers = {
    read_csv_file: ReadCSVFileController,
}
class ControllerFactory{
    static create(use_case_name){
        return new controllers[use_case_name]();
    }
}

module.exports = ControllerFactory;