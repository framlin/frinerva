const BookingEntryPresenter = require( "../../../../UI/cli/csv_import/BookingEntryPresenter");
const BookingEntry = require("../../../../account/BookingEntry");
const BOOKING_CODE = require("../../../../account/BOOKING_CODE");

it ('should be possible to create a display', () => {
    let presenter = new BookingEntryPresenter();
    expect(presenter).toBeDefined();
});

it ('should present an empty BookingEntry', () => {
    let booking_entry = new BookingEntry();
    let presentation = BookingEntryPresenter.present(booking_entry);

    expect(presentation).toBe("0; ; ; 0.00; n.a.");
});

it ('should present a filled BookingEntry', () => {
    let booking_entry = new BookingEntry(
        new Date(2022,6, 24),
        "banking fee",
        "fee",
        0.0,
        BOOKING_CODE.BANKING_FEE
        );
    let presentation = BookingEntryPresenter.present(booking_entry);
    expect(presentation).toBe("24.7.2022, 00:00:00; banking fee; fee; 0.00; BANKING_FEE")
});

it ('should present a list of 1 filled BookingEntries', () => {
    let booking_entries = [new BookingEntry(
        new Date(2022,6, 24),
        "banking fee",
        "fee",
        0.0,
        BOOKING_CODE.BANKING_FEE
    )]
    let presentation = BookingEntryPresenter.present(booking_entries);
    expect(presentation).toBe("24.7.2022, 00:00:00; banking fee; fee; 0.00; BANKING_FEE\n")

});

it ('should present a list of 2 filled BookingEntries', () => {
    let booking_entries = [new BookingEntry(
        new Date(2022,6, 24),
        "booking fee",
        "fee",
        0.0,
        BOOKING_CODE.BANKING_FEE
    ), new BookingEntry(
        new Date(2022,6, 24),
        "booking fee",
        "fee",
        0.0,
        BOOKING_CODE.BANKING_FEE
    )];
    let presentation = BookingEntryPresenter.present(booking_entries);
    let expected = "24.7.2022, 00:00:00; booking fee; fee; 0.00; BANKING_FEE\n"+
        "24.7.2022, 00:00:00; booking fee; fee; 0.00; BANKING_FEE\n";
    expect(presentation).toBe(expected);

});