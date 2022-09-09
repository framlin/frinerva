const MoneyMoneyCSVReader =  require("../../../app/persitance/money_money_tools/MoneyMoneyCSVReader");
const Readable = require('stream').Readable
//###########################################
//
//   "Datum": "31.12.2020",
//   "Wertstellung": "31.12.2020",
//   "Kategorie": "Stöttwang - Ausgang - Stw_Bank",
//   "Name": "Saldo der Abschlussposten QM - Support",
//   "Verwendungszweck": "04082 Leipzig Kontoabschluss 4. Quartal 20 AktivKonto (Kontofuhrung) 20,70 13 kostenfreie Poste",
//   "Konto": "",
//   "Bank": "",
//   "Betrag": "-30,70",
//   "Währung": "EUR"
//
//###########################################
function create_one_line_stream() {
    return new Readable.from(
        "Datum;Wertstellung;Kategorie;Name;Verwendungszweck;Konto;Bank;Betrag;Währung\n" +
        "31.12.2020;31.12.2020;Stöttwang - Ausgang - Stw_Bank;Saldo der Abschlussposten QM - Support;04082 Leipzig Kontoabschluss 4. Quartal 20 AktivKonto (Kontofuhrung) 20,70 13 kostenfreie Poste;;;-30,70;EUR\n");
}


function create_two_line_stream() {
    return new Readable.from(
        "Datum;Wertstellung;Kategorie;Name;Verwendungszweck;Konto;Bank;Betrag;Währung\n" +
        "31.12.2020;31.12.2020;Stöttwang - Ausgang - Stw_Bank;Saldo der Abschlussposten QM - Support;04082 Leipzig Kontoabschluss 4. Quartal 20 AktivKonto (Kontofuhrung) 20,70 13 kostenfreie Poste;;;-30,70;EUR\n" +
        "28.12.2020;26.12.2020;Stöttwang - Eingang - Kaution;Christian Doll;Kaution dritte Ratte;DE52700520600022627087;BYLADEM1LLD;500,00;EUR"
    )
}

it('returns an empty result for an empty file', async ()=>{
    let s = new Readable.from("");
    let payment_entries = await MoneyMoneyCSVReader.create_payments(s);
    expect(payment_entries.length).toBe(0);
});

it('returns one payment entries if reading one data lines and headers', async () => {
    let s = create_one_line_stream();
    let payment_entries = await MoneyMoneyCSVReader.create_payments(s);
    expect(payment_entries.length).toBe(1);
});

it('returns two payment entries if reading two data lines and headers', async () => {
    let s = create_two_line_stream();
    let payment_entries = await MoneyMoneyCSVReader.create_payments(s);
    expect(payment_entries.length).toBe(2);
});

