class FileSelectionInteractor {
    _file_selection_presenter = null;

    constructor(file_selection_presenter) {
        this._file_selection_presenter = file_selection_presenter;
    }

    execute_use_case() {
        this.file_selection_presenter.prompt_for_filename().then((filename) => {
            console.log(filename)
            if (this.file_selection_presenter.prompt_for_payment_creation(filename)) {
                console.log("UseCase: payment creation starting .....");
            }

        });
    }

    get file_selection_presenter() {
        return this._file_selection_presenter;
    }
}

module.exports = FileSelectionInteractor;