const Account = require("../../../src/accounting/account_management/Account");
const BookingEntry = require("../../../src/accounting/account_management/BookingEntry");

function account_with_two_entries() {
    let account = new Account('name', 'cost_center');
    let booking_entry = new BookingEntry(new Date("2022", "07", "05"), 'subject', 'name', 1.0, 'BC??');
    let booking_entry2 = new BookingEntry(new Date("2022", "07", "05"), 'subject', 'name', 1.0, 'BC??');

    account.add(booking_entry);
    account.add(booking_entry2);
    return account;
}

test('creation', () => {
    let account = new Account('name', 'cost_center');

    expect(account.cost_center).toBe('cost_center');
    expect(account.name).toBe('name');
});

test('adding booking-entries', () => {
    let account = new Account('name', 'cost_center');
    let booking_entry = new BookingEntry(Date.now(), 'subject', 'name', 1.0, 'BC??');

    account.add(booking_entry);
    expect(account.booking_entries).not.toBeNull();
});

test('adding two booking entries', () => {
    let account = account_with_two_entries();

    expect(account.booking_entries.length).toBe(2);

});

test('serialization', () => {
    let account = account_with_two_entries();

    expect(account.serialize()).toBe("{\"_name\":\"name\",\"_cost_center\":\"cost_center\",\"_booking_entries\":[{\"_date\":\"2022-08-04T22:00:00.000Z\",\"_subject\":\"subject\",\"_name\":\"name\",\"_amount\":\"1.00\",\"_booking_code\":\"BC??\"},{\"_date\":\"2022-08-04T22:00:00.000Z\",\"_subject\":\"subject\",\"_name\":\"name\",\"_amount\":\"1.00\",\"_booking_code\":\"BC??\"}]}");

});

test('un-serialization', () => {
    let account = account_with_two_entries();

    let serialized_account = account.serialize();
    let un_serialized_account = Account.create_from_JSON(serialized_account);

    expect(un_serialized_account).toBeInstanceOf(Account);
    expect(un_serialized_account.name).toBe('name');
    expect(un_serialized_account.cost_center).toBe('cost_center');
    expect(un_serialized_account.booking_records.length).toBe(2);
})