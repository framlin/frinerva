const FileLoadingRequestBoundary = require("./file_loading_request_boundary");

class FileLoadingInteractor extends FileLoadingRequestBoundary{
    _file_selection_presenter = null;
    _resolver = () => null;

    constructor(file_selection_presenter) {
        super();
        this._file_selection_presenter = file_selection_presenter;
    }

    execute_use_case() {
        return new Promise(resolve => {
            this._resolver = resolve;
            this.file_selection_presenter.prompt_for_filename();
        });
    }

    load_file(file_name) {
        console.log(`loading ${file_name} .....`);
        const Fs = require('fs');
        this._resolver(Fs.createReadStream(file_name, 'utf8'));
    }

    get file_selection_presenter() {
        return this._file_selection_presenter;
    }
}

module.exports = FileLoadingInteractor;