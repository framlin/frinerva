
class PaymentConversionInteractor{

    _response_boundary = null;
    _converter = null;

    constructor(payment_conversion_response_boundary, converter) {
        this._response_boundary = payment_conversion_response_boundary;
        this._converter = converter;
    }

    execute_use_case(payments) {
        return new Promise( resolve => {
            let booking_entries = [];
            for (let payment of payments) {
                booking_entries.push(this._converter.convert(payment));
            }
            this._response_boundary.show(booking_entries);
            resolve(booking_entries);
        });
    }

    get response_boundary() {
        return this._response_boundary;
    }
}

module.exports = PaymentConversionInteractor;