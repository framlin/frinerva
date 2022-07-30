const PaymentCreationInteractor = require("../../../../src/accounting/banking/payment_creation/payment_creation_interactor");

// noinspection JSUnusedGlobalSymbols
let presenter = {
    show: () => {
    }
};
let payment_creation_interactor;
let CSVReaderDummy = class {
    static create_payments(payments) {
        return Promise.resolve(payments);
    }
};

beforeEach(() => {
    payment_creation_interactor = new PaymentCreationInteractor(presenter, CSVReaderDummy);
});

test('creation', () => {
    expect(payment_creation_interactor).toBeDefined();
});

test('execute_use_case with empty file should return empty payments', () => {
    return expect(payment_creation_interactor.execute_use_case([])).resolves.toStrictEqual([]);
});


test('execute_use_case with filled file should return some payments', () => {
    let interactor = new PaymentCreationInteractor(presenter, CSVReaderDummy);
    return expect(interactor.execute_use_case([1])).resolves.toStrictEqual([1]);
});
