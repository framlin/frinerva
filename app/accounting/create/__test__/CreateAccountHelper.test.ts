import {CreateAccountHelper} from '../CreateAccountHelper';

let create_account_helper: CreateAccountHelper;

beforeEach(() => {
    create_account_helper = new CreateAccountHelper();
});

test('creation', () => {
    expect(create_account_helper).toBeInstanceOf(CreateAccountHelper);
});

