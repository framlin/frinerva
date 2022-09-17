const BookingEntry = require("../BookingEntry");
const BOOKING_CODE = require("../BOOKING_CODE");

let booking_entry;
beforeEach(() => {

})
it('should be possible to create an empty booking entry', () => {
    booking_entry = new BookingEntry();
    expect(booking_entry).toBeDefined();
});

test('if an empty booking_entry has a bunch of properties', () => {
    booking_entry = new BookingEntry();
    expect(booking_entry.date).toBe(0);
    expect(booking_entry.subject).toBe("");
    expect(booking_entry.name).toBe("");
    expect(booking_entry.amount).toBe(0.00.toFixed(2));
    expect(booking_entry.booking_code).toBe(BOOKING_CODE.NONE);
});

it('should be possible, to create an booking_entry with values', () => {
    let date = Date.now();
    booking_entry = new BookingEntry(date, "Vermietung", "Miete", 42.0, BOOKING_CODE.RENTAL_FEE);
    expect(booking_entry.date).toBe(date);
    expect(booking_entry.subject).toBe("Vermietung");
    expect(booking_entry.name).toBe("Miete");
    expect(booking_entry.amount).toBe(42.0.toFixed(2));
    expect(booking_entry.booking_code).toBe(BOOKING_CODE.RENTAL_FEE);

});

it('should be possible, to creat it from an un-serialized object', () => {
    let un_serialized_object = {
        _date: "2019-12-30T23:00:00.000Z",
        _subject: "04082 Leipzig Kontoabschluss 4. Quartal 19 14,9 % Uberziehungszinsen 0,04 AktivKonto (Kontofuhrung)",
        _name: "Saldo der Abschlussposten QM - Support",
        _amount: "-27.74",
        _booking_code: "BC??"
    };
     let booking_entry = BookingEntry.create_from_JSON(JSON.stringify(un_serialized_object));

     expect(booking_entry.name).toBe("Saldo der Abschlussposten QM - Support");
})