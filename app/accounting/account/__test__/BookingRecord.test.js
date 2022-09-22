const BookingRecord = require("../BookingRecord");
test('creation', () => {
    let cost_center = "BANKING";
    let booking_period = '2022';
    let booking_entry = {};
    let booking_record = new BookingRecord(booking_entry, cost_center, booking_period);

    expect(booking_record.booking_entry).toStrictEqual(booking_entry);
    expect(booking_record.cost_center).toBe(cost_center);
    expect(booking_record.booking_period).toBe(booking_period);
    expect(booking_record).toBeInstanceOf(BookingRecord);
});