import {BookingEntry} from "../BookingEntry";
import {BookingRecord} from "../BookingRecord";
test('creation', () => {
    const cost_center = "BANKING";
    const booking_period = '2022';
    const booking_entry: BookingEntry = new BookingEntry();
    const booking_record = new BookingRecord(booking_entry, cost_center, booking_period);

    expect(booking_record.booking_entry).toStrictEqual(booking_entry);
    expect(booking_record.cost_center).toBe(cost_center);
    expect(booking_record.booking_period).toBe(booking_period);
    expect(booking_record).toBeInstanceOf(BookingRecord);
});