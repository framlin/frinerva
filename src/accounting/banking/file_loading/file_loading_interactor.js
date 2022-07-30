const FileLoadingRequestBoundary = require("./file_loading_request_boundary");

class FileLoadingInteractor extends FileLoadingRequestBoundary{
    _response_boundary = null;
    _RESOLVER;

    constructor(file_loading_response_boundary) {
        super();
        this._response_boundary = file_loading_response_boundary;
    }

    async execute_use_case(file_name) {
        return new Promise(resolve => {
            this._RESOLVER = resolve;
            if (file_name) {
                this.load_file(file_name);
            } else {
                this._response_boundary.file_name_missing();
            }
        });
    }


    load_file(file_name) {
        const Fs = require('fs');
        this._RESOLVER(Fs.createReadStream(file_name, 'utf8'));
    }

}

module.exports = FileLoadingInteractor;