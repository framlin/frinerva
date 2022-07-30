class PaymentDisplayInteractor{
    _response_boundary = null;

    constructor(payment_display_response_boundary) {
        this._response_boundary = payment_display_response_boundary;
    }

    async execute_use_case(payments) {
        this._response_boundary.show(payments);
        return payments;
    }
}

module.exports = PaymentDisplayInteractor;