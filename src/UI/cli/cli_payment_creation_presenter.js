class CLIPaymentCreationPresenter{
    _payment_creation_controller = null;
    constructor(payment_creation_controller) {
        this._payment_creation_controller = payment_creation_controller
    }

    show(payments) {
        console.log(`${payments.length} payments created`)
    }

}

module.exports = CLIPaymentCreationPresenter;