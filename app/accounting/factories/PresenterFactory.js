const ReadCSVFilePresenter = require("../import/read_csv_file/ReadCSVFilePresenter");
const CreateAccountPresenter = require("../create/CreateAccountPresenter");

const presenters = {
    read_csv_file: ReadCSVFilePresenter,
    create_account: CreateAccountPresenter,
}
class PresenterFactory{
    static create(use_case_name, ipc_channel) {
        return new presenters[use_case_name](ipc_channel);
    }
}

module.exports = PresenterFactory;



