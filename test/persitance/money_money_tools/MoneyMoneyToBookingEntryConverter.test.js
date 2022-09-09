// noinspection JSNonASCIINames

const MoneyMoneyToBookingRecordConverter = require("../../../app/persitance/money_money_tools/MoneyMoneyToBookingRecordConverter");
const BookingEntry = require("../../../app/business/accounting/account/BookingEntry");

it('should be possible, to create a payment_to_booking_entry_converter', () => {
    let payment_to_booking_entry_converter = new MoneyMoneyToBookingRecordConverter();
    expect(payment_to_booking_entry_converter).toBeDefined();
});

it('should be possible to convert a payment entry to a booking entry', () => {
    let payment_to_booking_entry_converter = new MoneyMoneyToBookingRecordConverter();

    // noinspection NonAsciiCharacters
    let payment_entry = {
        "Datum": "31.12.2020",
        "Wertstellung": "31.12.2020",
        "Kategorie": "Stöttwang - Ausgang - Stw_Bank",
        "Name": "Saldo der Abschlussposten QM - Support",
        "Verwendungszweck": "04082 Leipzig Kontoabschluss 4. Quartal 20 AktivKonto (Kontofuhrung) 20,70 13 kostenfreie Poste",
        "Konto": "",
        "Bank": "",
        "Betrag": "-30,70",
        "Währung": "EUR"
    };

    let {booking_entry, cost_center, year} = payment_to_booking_entry_converter.convert(payment_entry);
    let date = new Date(2020, 11, 31);
    let expected_booking_entry = new BookingEntry(
        date,
        "04082 Leipzig Kontoabschluss 4. Quartal 20 AktivKonto (Kontofuhrung) 20,70 13 kostenfreie Poste",
        "Saldo der Abschlussposten QM - Support",
        -30.7,
        "BC??"
    );

    expect(booking_entry).toStrictEqual(expected_booking_entry);
    expect(year).toBe(2020);
    expect(cost_center).toBe('BANKING');

})

