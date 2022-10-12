"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Balancing_1 = require("../Balancing");
const Account_1 = require("../../../accounting/account/Account");
const Balance_1 = require("../Balance");
test('creation', () => {
    let balancing = new Balancing_1.Balancing();
    expect(balancing).toBeDefined();
});
test('getting an Account', () => {
    let balancing = new Balancing_1.Balancing();
    let account = new Account_1.Account('name', 'CC');
    let balance = new Balance_1.Balance('name', "2022");
    balance.add(account);
    balancing.register(balance);
    let account2 = balancing.get_accounts('CC', "2022")[0];
    expect(account2).toStrictEqual(account);
});
//# sourceMappingURL=Balancing.test.js.map