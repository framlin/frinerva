class CLIFileLoadingController {
    _file_loading_request_boundary = null;

    set file_loading_request_boundary(file_loading_request_boundary){
        this._file_loading_request_boundary = file_loading_request_boundary;
    }

    set load_file(file_name) {
        this._file_loading_request_boundary.load_file(file_name);
    }
}

module.exports = CLIFileLoadingController;