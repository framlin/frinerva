class CLIPaymentDisplayPresenter{
    show(payments) {
        for(let payment of payments) {
            console.log(`${payment.Datum}, ${payment.Kategorie}, ${payment.Name}, ${payment.Betrag} `)
        }
    }
}
module.exports = CLIPaymentDisplayPresenter;