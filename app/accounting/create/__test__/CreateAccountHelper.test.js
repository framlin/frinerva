"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAccountHelper_1 = require("../CreateAccountHelper");
let create_account_helper;
beforeEach(() => {
    create_account_helper = new CreateAccountHelper_1.CreateAccountHelper();
});
test('creation', () => {
    expect(create_account_helper).toBeInstanceOf(CreateAccountHelper_1.CreateAccountHelper);
});
//# sourceMappingURL=CreateAccountHelper.test.js.map