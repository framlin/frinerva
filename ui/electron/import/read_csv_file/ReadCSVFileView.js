const UseCaseView = require("../../use_case/UseCaseView");
const path = require("path");

class ReadCSVFileView extends UseCaseView{
    constructor() {
        super(path.join(__dirname, 'ReadCSVFilePreloader.js'));
    }
}

module.exports = ReadCSVFileView;