const FileLoadingInteractor = require("./file_loading/file_loading_interactor");
const PaymentCreationInteractor = require("./payment_creation/payment_creation_interactor");

class ImportCSVBankingStatementsInteractor {
    _file_loading_response_boundary = null;
    _file_loading_interactor = null;
    _payment_creation_interactor = null;

    constructor(response_boundaries) {
        this._file_loading_response_boundary = response_boundaries.file_loading_response_boundary;
        this._file_loading_interactor = new FileLoadingInteractor(response_boundaries.file_loading_response_boundary);

        this._payment_creation_response_boundary = response_boundaries.payment_creation_response_boundary;
        this._payment_creation_interactor = new PaymentCreationInteractor(response_boundaries.payment_creation_response_boundary);
    }


    execute_use_case(file_name) {
        return new Promise(resolve => {
            this._file_loading_interactor.execute_use_case(file_name)
                .then( file => {
                    return this._payment_creation_interactor.execute_use_case(file);
                })
                .then( payments => {
                    resolve(payments);
                });
        });
    }

    get file_loading_response_boundary () {
        return this._file_loading_response_boundary;
    }

    get file_loading_request_boundary() {
        return this._file_loading_interactor;
    }

}

module.exports = ImportCSVBankingStatementsInteractor;