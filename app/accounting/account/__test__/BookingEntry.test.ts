import {BookingEntry} from "../BookingEntry";
import {BOOKING_CODE} from "../BOOKING_CODE";

let booking_entry;
beforeEach(() => {

})
it('should be possible to create an empty booking entry', () => {
    booking_entry = new BookingEntry();
    expect(booking_entry).toBeDefined();
});

test('if an empty booking_entry has a bunch of properties', () => {
    booking_entry = new BookingEntry();
    expect(booking_entry.date).toBeDefined()
    expect(booking_entry.subject).toBe("");
    expect(booking_entry.name).toBe("");
    expect(booking_entry.amount).toBe(0);
    expect(booking_entry.booking_code).toBe(BOOKING_CODE.NONE);
    expect(booking_entry.id.indexOf('-')).toBeGreaterThan(0);
});

it('should be possible, to create an booking_entry with values', () => {
    let date = new Date();
    booking_entry = new BookingEntry(date, "Vermietung", "Miete", 42.0, BOOKING_CODE.RENTAL_FEE,"1-1-1");
    expect(booking_entry.date).toBe(date);
    expect(booking_entry.subject).toBe("Vermietung");
    expect(booking_entry.name).toBe("Miete");
    expect(booking_entry.amount).toBe(42);
    expect(booking_entry.booking_code).toBe(BOOKING_CODE.RENTAL_FEE);
    expect(booking_entry.id).toBe("1-1-1");

});

it('should be possible, to creat it from an un-serialized object', () => {
    let un_serialized_object = {
        _date: "2019-12-30T23:00:00.000Z",
        _subject: "04082 Leipzig Kontoabschluss 4. Quartal 19 14,9 % Uberziehungszinsen 0,04 AktivKonto (Kontofuhrung)",
        _name: "Saldo der Abschlussposten QM - Support",
        _amount: "-27.74",
        _booking_code: "BC??",
        _id: "1"
    };
    let booking_entry = BookingEntry.create_from_JSON(JSON.stringify(un_serialized_object));

    expect(booking_entry.name).toBe("Saldo der Abschlussposten QM - Support");
    expect(booking_entry.id).toBe("1");
})