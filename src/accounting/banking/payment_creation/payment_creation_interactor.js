class PaymentCreationInteractor {

    _response_boundary = null;
    _CVS_Reader = null;

    constructor(payment_creation_response_boundary, CVS_Reader) {
        this._response_boundary = payment_creation_response_boundary;
        this._CVS_Reader = CVS_Reader;
    }

    async execute_use_case(file) {
        let payments = await this._CVS_Reader.create_payments(file);
        this._response_boundary.show(payments);
        return payments;
    }
}

module.exports = PaymentCreationInteractor;