const ReadCSVFileInteractor = require("../import/read_csv_file/ReadCSVFileInteractor");
const CreateAccountInteractor = require("../create/CreateAccountInteractor");
const ShowListInteractor = require("../show_list/ShowListInteractor");

const Interactors = {
    read_csv_file: ReadCSVFileInteractor,
    create_account: CreateAccountInteractor,
    show_list: ShowListInteractor,
}
module.exports = Interactors;