class CLIPaymentDisplayPresenter{
    _payment_display_controller = null;
    constructor(payment_creation_controller) {
        this._payment_creation_controller = payment_creation_controller
    }

    show(payments) {
        for(let payment of payments) {
            console.log(`${payment.Datum}, ${payment.Kategorie}, ${payment.Name}, ${payment.Betrag} `)
        }
    }

}

module.exports = CLIPaymentDisplayPresenter;