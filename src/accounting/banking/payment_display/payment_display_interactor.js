class PaymentDisplayInteractor{
    _response_boundary = null;

    constructor(payment_display_response_boundary) {
        this._response_boundary = payment_display_response_boundary;
    }

    execute_use_case(payments) {
        return new Promise(resolve => {
            this._response_boundary.show(payments);
            resolve(payments);
        });

    }
}

module.exports = PaymentDisplayInteractor;