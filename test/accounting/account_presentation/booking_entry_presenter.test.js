const BookingEntryPresenter = require( "../../../src/accounting/account_presentation/booking_entry_presenter");
const BookingEntry = require("../../../src/accounting/account_management/booking_entry");
const BOKING_CODE = require("../../../src/accounting/account_management/booking_code");

it ('should be possible to create a presenter', () => {
    let presenter = new BookingEntryPresenter();
    expect(presenter).toBeDefined();
});

it ('should present an empty BookingEntry', () => {
    let presenter = new BookingEntryPresenter();
    let booking_entry = new BookingEntry();
    let presentation = presenter.present(booking_entry);

    expect(presentation).toBe("0, , , 0.00, n.a.");
});

it ('should present a filled BookingEntry', () => {
    let presenter = new BookingEntryPresenter();
    let booking_entry = new BookingEntry(
        new Date(2022,6, 24),
        "banking fee",
        "fee",
        0.0,
        BOKING_CODE.BANKING_FEE
        );
    let presentation = presenter.present(booking_entry);
    expect(presentation).toBe("Sun Jul 24 2022 00:00:00 GMT+0200 (Central European Summer Time), banking fee, fee, 0.00, BANKING_FEE")
});

it ('should present a list of 1 filled BookingEntries', () => {
    let presenter = new BookingEntryPresenter();
    let booking_entries = [new BookingEntry(
        new Date(2022,6, 24),
        "booking fee",
        "fee",
        0.0,
        BOKING_CODE.BANKING_FEE
    )]
    let presentation = presenter.present(booking_entries);
    expect(presentation).toBe("Sun Jul 24 2022 00:00:00 GMT+0200 (Central European Summer Time), booking fee, fee, 0.00, BANKING_FEE\n")

});

it ('should present a list of 2 filled BookingEntries', () => {
    let presenter = new BookingEntryPresenter();
    let booking_entries = [new BookingEntry(
        new Date(2022,6, 24),
        "booking fee",
        "fee",
        0.0,
        BOKING_CODE.BANKING_FEE
    ), new BookingEntry(
        new Date(2022,6, 24),
        "booking fee",
        "fee",
        0.0,
        BOKING_CODE.BANKING_FEE
    )];
    let presentation = presenter.present(booking_entries);
    let expected = "Sun Jul 24 2022 00:00:00 GMT+0200 (Central European Summer Time), booking fee, fee, 0.00, BANKING_FEE\n"+
        "Sun Jul 24 2022 00:00:00 GMT+0200 (Central European Summer Time), booking fee, fee, 0.00, BANKING_FEE\n";
    expect(presentation).toBe(expected);

});