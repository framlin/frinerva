const FileSelectionInteractor = require("./file_loading/file_loading_interactor");

class ImportCSVBankingStatementsInteractor {
    _file_selection_presenter = null;
    _file_selection_interactor = null;
    _promise = null;
    _error = "very very bad";

    constructor(file_selection_presenter) {
        this._file_selection_presenter = file_selection_presenter;
        this._file_selection_interactor = new FileSelectionInteractor(file_selection_presenter);
        file_selection_presenter.set_request_boundary(this._file_selection_interactor);
    }


    execute_use_case() {
        return new Promise(resolve => {
            this.file_selection_interactor.execute_use_case().then(payments => {
                resolve(payments);
            });
        });
    }

    get file_selection_presenter () {
        return this._file_selection_presenter;
    }

    get file_selection_interactor() {
        return this._file_selection_interactor;
    }

}

module.exports = ImportCSVBankingStatementsInteractor;