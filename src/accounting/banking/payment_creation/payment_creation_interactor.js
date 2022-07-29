const MoneyMoneyCSVReader = require("./moneymoney_csv_reader");

class PaymentCreationInteractor{

    _payment_creation_response_boundary = null;

    constructor(payment_creation_response_boundary) {
        this._payment_creation_response_boundary = payment_creation_response_boundary;
    }

    execute_use_case(file) {
        return new Promise( resolve => {
            MoneyMoneyCSVReader.create_payments(file).then(payments => {
                this.payment_creation_response_boundary.take_payments(payments);
                resolve(payments);
            });
        });
    }
    get payment_creation_response_boundary() {
        return this._payment_creation_response_boundary;
    }
}

module.exports = PaymentCreationInteractor;