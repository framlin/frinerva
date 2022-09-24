const ReadCSVFilePresenter = require("../import/read_csv_file/ReadCSVFilePresenter");
const CreateAccountPresenter = require("../create/CreateAccountPresenter");
const ShowListPresenter = require("../show_list/ShowListPresenter");
const Presenter = {
    read_csv_file: ReadCSVFilePresenter,
    create_account: CreateAccountPresenter,
    show_list: ShowListPresenter,
}
module.exports = Presenter;