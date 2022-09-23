const ReadCSVFileController = require("../import/read_csv_file/ReadCSVFileController");
const CreateAccountController = require("../create/CreateAccountController");

const controllers = {
    read_csv_file: ReadCSVFileController,
    create_account: CreateAccountController,
}
class ControllerFactory{
    static create(use_case_name){
        return new controllers[use_case_name]();
    }
}

module.exports = ControllerFactory;