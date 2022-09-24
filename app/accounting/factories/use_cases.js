const ReadCSVFile = require("../import/read_csv_file/ReadCSVFile");
const CreateAccount = require("../create/CreateAccount");
const ShowList = require("../show_list/ShowList");

const UseCases = {
    read_csv_file: ReadCSVFile,
    create_account: CreateAccount,
    show_list: ShowList,
}

module.exports = UseCases;
