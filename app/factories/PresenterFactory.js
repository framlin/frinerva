const ReadCSVFilePresenter = require("../business/accounting/import/read_csv_file/ReadCSVFilePresenter");
const presenters = {
    read_csv_file: ReadCSVFilePresenter,
}
class PresenterFactory{
    static create(use_case_name, ipc_channel) {
        return new presenters[use_case_name](ipc_channel);
    }
}

module.exports = PresenterFactory;



