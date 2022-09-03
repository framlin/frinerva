const ReadCSVFileInteractor = require("../use_cases/import/read_csv_file/ReadCSVFileInteractor");
const interactors = {
    read_csv_file: ReadCSVFileInteractor,
}
class InteractorFactory{
    static create(use_case_name) {
        return new interactors[use_case_name]();
    }
}

module.exports = InteractorFactory;