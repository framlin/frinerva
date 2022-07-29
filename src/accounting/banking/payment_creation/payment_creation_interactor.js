
class PaymentCreationInteractor{

    _response_boundary = null;
    _CVS_Reader = null;

    constructor(payment_creation_response_boundary, CVS_Reader) {
        this._response_boundary = payment_creation_response_boundary;
        this._CVS_Reader = CVS_Reader;
    }

    execute_use_case(file) {
        return new Promise( resolve => {
            this._CVS_Reader.create_payments(file).then(payments => {
                this.response_boundary.show(payments);
                resolve(payments);
            });
        });
    }
    get response_boundary() {
        return this._response_boundary;
    }
}

module.exports = PaymentCreationInteractor;