export interface Payment {
    [key: string]: string
}

export interface MoneyMoneyPayment extends Payment{
    Datum: string,
    Betrag: string,
    Verwendungszweck: string,
    Name: string,
}
