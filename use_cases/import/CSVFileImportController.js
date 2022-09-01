class CSVFileImportController{
    _interactor = null;

    constructor(interactor) {
        this._interactor = interactor;
    }

    import_file(file_name) {
        this._interactor.execute_use_case(file_name);
    }

    get payments() {
        return this._interactor.payments;
    }

    get booking_entries() {
        return this._interactor.booking_records;
    }
}

module.exports = CSVFileImportController;


