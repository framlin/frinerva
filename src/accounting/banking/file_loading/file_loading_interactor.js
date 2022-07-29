const FileLoadingRequestBoundary = require("./file_loading_request_boundary");
const Fs = require("fs");

class FileLoadingInteractor extends FileLoadingRequestBoundary{
    _file_loading_response_boundary = null;

    constructor(file_loading_response_boundary) {
        super();
        this._file_loading_response_boundary = file_loading_response_boundary;
    }

    execute_use_case(file_name) {
        return new Promise(resolve => {
            this._resolver = resolve;
            if (file_name) {
                resolve(this.load_file(file_name));
            } else {
                this.file_loading_response_boundary.prompt_for_filename()
                    .then(file_name => {
                        resolve(this.load_file(file_name));
                    });
            }
        });
    }

    load_file(file_name) {
        console.log(`loading ${file_name} .....`);
        const Fs = require('fs');
        return Fs.createReadStream(file_name, 'utf8');
    }

    get file_loading_response_boundary() {
        return this._file_loading_response_boundary;
    }
}

module.exports = FileLoadingInteractor;