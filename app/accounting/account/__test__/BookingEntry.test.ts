import {BookingEntry, BookingEntryData} from "../BookingEntry";

let booking_entry: BookingEntry;

//test create empty booking entry
it('should be possible to create an empty booking entry', () => {
    booking_entry = new BookingEntry();
    expect(booking_entry).toBeInstanceOf(BookingEntry);
});

//test create booking entry with date
it('should be possible to create a booking entry with a date', () => {
    const date = new Date();
    booking_entry = new BookingEntry(date);
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.date).toBe(date);
});

//test create booking entry with date and subject
it('should be possible to create a booking entry with a date and a subject', () => {
    booking_entry = new BookingEntry(new Date(), 'subject');
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.subject).toBe('subject');
});

//test create booking entry with date, subject and name
it('should be possible to create a booking entry with a date, a subject and a name', () => {
    booking_entry = new BookingEntry(new Date(), 'subject', 'name');
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.name).toBe('name');
});

//test create booking entry with date, subject, name and amount
it('should be possible to create a booking entry with a date, a subject, a name and an amount', () => {
    booking_entry = new BookingEntry(new Date(), 'subject', 'name', 100);
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.amount).toBe(100);
});

//test create booking entry with date, subject, name, amount and booking code
it('should be possible to create a booking entry with a date, a subject, a name, an amount and a booking code', () => {
    booking_entry = new BookingEntry(new Date(), 'subject', 'name', 100, 'booking code');
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.booking_code).toBe('booking code');
});

//test create booking entry with date, subject, name, amount, booking code and id
it('should be possible to create a booking entry with a date, a subject, a name, an amount, a booking code and an id', () => {
    booking_entry = new BookingEntry(new Date(), 'subject', 'name', 100, 'booking code', 'id');
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.id).toBe('id');
});

//test create_fron_JSON
it('should be possible to create a booking entry from JSON', () => {
    const date = new Date();
    const subject = 'subject';
    const name = 'name';
    const amount = 100;
    const booking_code = 'booking code';
    const id = 'id';
    const serialized_booking_entry = JSON.stringify({
        _date: date,
        _subject: subject,
        _name: name,
        _amount: amount,
        _booking_code: booking_code,
        _id: id
    });
    booking_entry = BookingEntry.create_from_JSON(serialized_booking_entry);
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.date).toStrictEqual(date);
    expect(booking_entry.subject).toBe(subject);
    expect(booking_entry.name).toBe(name);
    expect(booking_entry.amount).toBe(amount);
    expect(booking_entry.booking_code).toBe(booking_code);
    expect(booking_entry.id).toBe(id);
});

//test create_from_data
it('should be possible to create a booking entry from data', () => {
    const bookingEntryData: BookingEntryData = {
        date_as_string: '2020-01-01',
        date: new Date(2020, 0, 1),
        subject: 'subject',
        name: 'name',
        amount: 100,
        amount_as_string: '100',
        booking_code: 'booking code',
        id: 'id'
    }

    booking_entry = BookingEntry.create_from_data(bookingEntryData);
    expect(booking_entry).toBeInstanceOf(BookingEntry);
    expect(booking_entry.date).toStrictEqual(bookingEntryData.date);
    expect(booking_entry.subject).toBe(bookingEntryData.subject);
    expect(booking_entry.name).toBe(bookingEntryData.name);
    expect(booking_entry.amount).toBe(bookingEntryData.amount);
    expect(booking_entry.booking_code).toBe(bookingEntryData.booking_code);
    expect(booking_entry.id).toBe(bookingEntryData.id);
});

//test amount_as_string
it('should be possible to get the amount as a string', () => {
    booking_entry = new BookingEntry(new Date(), 'subject', 'name', 100, 'booking code', 'id');
    expect(booking_entry.amount_as_string).toBe('100.00');
});

//test date_as_string
it('should be possible to get the date as a string', () => {
    booking_entry = new BookingEntry(new Date(2020, 0, 1), 'subject', 'name', 100, 'booking code', 'id');
    expect(booking_entry.date_as_string).toBe('1.1.2020');
});

//test to_string
it('should be possible to get the booking entry as a string', () => {
    booking_entry = new BookingEntry(new Date(2020, 0, 1), 'subject', 'name', 100, 'booking code', 'id');
    expect(booking_entry.toString()).toBe('1.1.2020; subject; name; 100.00; booking code');
});
