interface Payment {
    [key: string]: string
}

interface MoneyMoneyPayment extends Payment{
    Datum: string,
    Betrag: string,
    Verwendungszweck: string,
    Name: string,
}

export {Payment, MoneyMoneyPayment};