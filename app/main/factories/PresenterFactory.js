const ReadCSVFilePresenter = require("../../accounting/import/read_csv_file/ReadCSVFilePresenter");
const CreateAccountPresenter = require("../../accounting/create/CreateAccountPresenter");

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



