class PaymentDisplayInteractor{
    _payment_display_response_boundary = null;

    constructor(payment_display_response_boundary) {
        this._payment_display_response_boundary = payment_display_response_boundary;
    }

    execute_use_case(payments) {
        return new Promise(resolve => {
            this._payment_display_response_boundary.show(payments);
            resolve(payments);
        })

    }
}

module.exports = PaymentDisplayInteractor;