class CLIPaymentCreationPresenter{
    _payment_creation_controller = null;
    constructor(payment_creation_controller) {
        this._payment_creation_controller = payment_creation_controller
    }

    take_payments(payments) {
        for(let payment of payments) {
            console.log(`${payment.Datum}, ${payment.Kategorie}, ${payment.Name}, ${payment.Betrag} `)
        }
    }

}

module.exports = CLIPaymentCreationPresenter;