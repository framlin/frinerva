const ReadCSVFileView = require("../import/read_csv_file/ui/ReadCSVFileView");
const CreateAccountView = require("../create/ui/CreateAccountView");
const ShowListView = require("../show_list/ui/ShowListView");
const Views = {
    read_csv_file: ReadCSVFileView,
    create_account: CreateAccountView,
    show_list: ShowListView,
}

module.exports = Views;