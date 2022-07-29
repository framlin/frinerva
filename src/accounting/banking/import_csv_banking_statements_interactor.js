const FileLoadingInteractor = require("./file_loading/file_loading_interactor");
const PaymentCreationInteractor = require("./payment_creation/payment_creation_interactor");
const MoneyMoneyCSVReader = require("./payment_creation/moneymoney_csv_reader");
const PaymentDisplayInteractor = require("./payment_display/payment_display_interactor");
const PaymentConversionInteractor = require("./payment_conversion/payment_conversion_interactor");
const MoneyMoneyToBookingEntryConverter = require("./payment_conversion/moneymoney_to_booking_entry_converter");

class ImportCSVBankingStatementsInteractor {
    _file_loading_response_boundary = null;
    _file_loading_interactor = null;

    _payment_creation_interactor = null;
    _payment_creation_response_boundary = null;

    _payment_display_response_boundary = null;
    _payment_display_interactor = null;

    _payment_conversion_interactor = null;
    _payment_conversion_response_boundary = null;

    constructor(response_boundaries) {
        this._file_loading_response_boundary = response_boundaries.file_loading_response_boundary;
        this._file_loading_interactor = new FileLoadingInteractor(response_boundaries.file_loading_response_boundary);

        this._payment_creation_response_boundary = response_boundaries.payment_creation_response_boundary;
        this._payment_creation_interactor = new PaymentCreationInteractor(response_boundaries.payment_creation_response_boundary, MoneyMoneyCSVReader);

        this._payment_display_response_boundary = response_boundaries.payment_display_response_boundary;
        this._payment_display_interactor = new PaymentDisplayInteractor(response_boundaries.payment_display_response_boundary);

        this._payment_conversion_response_boundary = response_boundaries.payment_conversion_response_boundary;
        this._payment_conversion_interactor = new PaymentConversionInteractor(response_boundaries.payment_conversion_response_boundary, new MoneyMoneyToBookingEntryConverter());
    }


    execute_use_case(file_name) {
        return new Promise(resolve => {
            this._file_loading_interactor.execute_use_case(file_name)
                .then( file => {
                    return this._payment_creation_interactor.execute_use_case(file);
                })
                .then( payments => {
                    return this._payment_display_interactor.execute_use_case(payments);
                })
                .then(payments => {
                    return this._payment_conversion_interactor.execute_use_case(payments);
                })
                .then(booking_entries => {
                    resolve(booking_entries);
                });
        });
    }

    get file_loading_response_boundary () {
        return this._file_loading_response_boundary;
    }

    get file_loading_request_boundary() {
        return this._file_loading_interactor;
    }

    get payment_creation_response_boundary() {
        return this._payment_creation_response_boundary;
    }

    get payment_conversion_response_boundary() {
        return this._payment_conversion_response_boundary;
    }

    get payment_display_response_boundary() {
        return this._payment_display_response_boundary;
    }

}

module.exports = ImportCSVBankingStatementsInteractor;