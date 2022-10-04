const {CreateAccountHelper} = require('../CreateAccountHelper');

let create_account_helper;

beforeEach(() => {
    create_account_helper = new CreateAccountHelper();
});

test('creation', () => {
    expect(create_account_helper).toBeInstanceOf(CreateAccountHelper);
});

