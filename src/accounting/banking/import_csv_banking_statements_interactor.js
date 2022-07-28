const FileSelectionInteractor = require("./file_selection/file_selection_interactor");

class ImportCSVBankingStatementsInteractor {
    _file_selection_presenter = null;
    _file_selection_interactor = null;

    constructor(file_selection_presenter) {
        this._file_selection_presenter = file_selection_presenter;
        this._file_selection_interactor = new FileSelectionInteractor(file_selection_presenter);
    }

    execute_use_case() {
        this.file_selection_interactor.execute_use_case();
    }

    get file_selection_presenter () {
        return this._file_selection_presenter;
    }

    get file_selection_interactor() {
        return this._file_selection_interactor;
    }

}

module.exports = ImportCSVBankingStatementsInteractor;