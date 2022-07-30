class PaymentConversionInteractor {

    _response_boundary = null;
    _converter = null;

    constructor(payment_conversion_response_boundary, converter) {
        this._response_boundary = payment_conversion_response_boundary;
        this._converter = converter;
    }

    async execute_use_case(payments) {
        let booking_entries = [];
        for (let payment of payments) {
            booking_entries.push(this._converter.convert(payment));
        }
        this._response_boundary.show(booking_entries);
        return booking_entries;
    }

}

module.exports = PaymentConversionInteractor;