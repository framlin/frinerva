class CLIImportController{
    _request_boundary = null;

    constructor(request_boundary) {
        this._request_boundary = request_boundary;
    }

    import_file(file_name) {
        this._request_boundary.execute_use_case(file_name);
    }
}

module.exports = CLIImportController;


