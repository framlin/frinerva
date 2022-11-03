import { Balancing } from "../Balancing";
import { Account } from "../../../accounting/entites/Account";
import { Balance } from "../Balance";

test('creation', () => {
    let balancing = new Balancing();

    expect(balancing).toBeDefined();
});

test('getting an Account', () => {
    let balancing = new Balancing();
    let account = new Account({booking_period: 'name', cost_center: 'CC'});
    let balance = new Balance('name', "2022");
    balance.add(account);
    balancing.register(balance);

    let account2 = balancing.get_accounts({cost_center:'CC', booking_period: "2022"})[0];
    expect(account2).toStrictEqual(account);
})