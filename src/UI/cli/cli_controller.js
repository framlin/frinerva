class CLIController {
    _file_name = "";
    _request_boundary = null;

    set request_boundary(request_boundary){
        this._request_boundary = request_boundary;
    }

    set file_name(file_name) {
        this._file_name = file_name;
        this._request_boundary.load_file(file_name);
    }

    get file_name() {
        return this._file_name;
    }
}

module.exports = CLIController;