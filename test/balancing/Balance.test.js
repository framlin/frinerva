const Balance = require("../../src/balancing/Balance");
const Account = require("../../src/accounting/account_management/Account");
test('creation', () => {
    let balance = new Balance("name", 2022);

    expect(balance.name).toBe("name");
    expect(balance.booking_period).toBe(2022);
});

test('add Account', () => {
    let balance = new Balance("name", 2022);
    let account = new Account('account1', 'CC');

    balance.add(account);
    expect(balance.accounts.length).toBe(1);

});

test('add two Accounts', () => {
    let balance = new Balance("name", 2022);
    let account = new Account('account1', 'CC');
    let account2 = new Account('account2', 'C2');

    balance.add(account);
    balance.add(account2);
    expect(balance.accounts.length).toBe(2);
});

test('setting accounts', () => {
    let balance = new Balance("name", 2022);
    let account = new Account('account1', 'CC');
    let account2 = new Account('account2', 'C2');

    let accounts = [account, account2];
    balance.accounts = accounts;

    expect(balance.accounts).toStrictEqual(accounts);
});

test('serialization', () => {
    let balance = new Balance("name", 2022);
    let account = new Account('account1', 'CC');
    let account2 = new Account('account2', 'C2');

    balance.add(account);
    balance.add(account2);

    let serialized_balance = balance.serialize();
    expect(serialized_balance).toBe("{\"_name\":\"name\",\"_booking_period\":2022,\"_accounts\":[{\"_name\":\"account1\",\"_cost_center\":\"CC\",\"_booking_entries\":[]},{\"_name\":\"account2\",\"_cost_center\":\"C2\",\"_booking_entries\":[]}]}");

})

test('un-serialization', () => {
    let balance = new Balance("name", 2022);
    let account = new Account('account1', 'CC');
    let account2 = new Account('account2', 'C2');

    balance.add(account);
    balance.add(account2);

    let serialized_balance = balance.serialize();
    let un_serialized_balance = Balance.create_from_JSON(serialized_balance);
    expect(un_serialized_balance).toBeInstanceOf(Balance);
    expect(un_serialized_balance.name).toBe('name');
    expect(un_serialized_balance.booking_period).toBe(2022);


})

