const ReadCSVFilePresenter = require("../business/accounting/import/read_csv_file/ReadCSVFilePresenter");
const presenters = {
    read_csv_file: ReadCSVFilePresenter,
}
class PresenterFactory{
    static create(use_case_name) {
        return new presenters[use_case_name]();
    }
}

module.exports = PresenterFactory;