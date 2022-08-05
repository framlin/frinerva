const BookingEntry = require("../../../src/accounting/account_management/BookingEntry");
const BOOKING_CODE = require("../../../src/accounting/account_management/BOOKING_CODE");

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

})