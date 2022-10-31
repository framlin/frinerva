import {Account} from "../Account";
import {BookingEntry} from "../BookingEntry";

// test creation of account from JSON
test('create_from_JSON', () => {
    let account = Account.create_from_JSON('{' +
        '"_booking_period":"2018-01","_cost_center":"test",' +
        '"_booking_entries":[{"_date":"2018-01-01T00:00:00.000Z",' +
        '"_subject":"test","_name":"test","_amount":1,' +
        '"_booking_code":"test","_id":"test"}]}');
    expect(account.booking_period).toBe("2018-01");
    expect(account.cost_center).toBe("test");
    expect(account.booking_entries.length).toBe(1);
    expect(account.booking_entries[0].date).toStrictEqual(new Date("2018-01-01T00:00:00.000Z"));
    expect(account.booking_entries[0].subject).toBe("test");
    expect(account.booking_entries[0].name).toBe("test");
    expect(account.booking_entries[0].amount).toBe(1);
    expect(account.booking_entries[0].booking_code).toBe("test");
    expect(account.booking_entries[0].id).toBe("test");
});

// test serialization of account
test('serialize', () => {
    let account = new Account({booking_period: "2018-01", cost_center: "test"});
    account.add(new BookingEntry(new Date("2018-01-01T00:00:00.000Z"), "test", "test", 1, "test", "test"));
    expect(account.serialize()).toBe('{"_booking_period":"2018-01","_cost_center":"test","_booking_entries":[{"_date":"2018-01-01T00:00:00.000Z","_subject":"test","_name":"test","_amount":1,"_booking_code":"test","_id":"test"}]}');
});


// test getting data from account
test('get data', () => {
    let account = new Account({booking_period: "2018-01", cost_center: "test"});
    let expected_date = new Date("2018-01-01T00:00:00.000Z");
    account.add(new BookingEntry(new Date("2018-01-01T00:00:00.000Z"), "test", "test", 1, "test", "test"));
    expect(account.data).toStrictEqual({
        booking_period: "2018-01",
        cost_center: "test",
        booking_entries: [{
            date: expected_date,
            date_as_string: "1.1.2018",
            subject: "test",
            name: "test",
            amount: 1,
            amount_as_string: "1.00",
            booking_code: "test",
            id: "test"
        }]
    });
});

// test adding booking entry to account
test('add', () => {
    let account = new Account({booking_period: "2018-01", cost_center: "test"});
    account.add(new BookingEntry(new Date("2018-01-01T00:00:00.000Z"), "test", "test", 1, "test", "test"));
    expect(account.booking_entries.length).toBe(1);
});

