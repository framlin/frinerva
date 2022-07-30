const PaymentCreationInteractor = require("../../../../src/accounting/banking/payment_creation/payment_creation_interactor");

// noinspection JSUnusedGlobalSymbols
let presenter = {
    show: () => {
    }
};
let payment_creation_interactor;
let CSVReaderDummy = class {
    static create_payments(payments) {
        return new Promise(resolve => {
            resolve(payments);
        });
    }
};

async function call_execute(interactor, payments) {
    return await interactor.execute_use_case(payments);
}

beforeEach(() => {
    payment_creation_interactor = new PaymentCreationInteractor(presenter, CSVReaderDummy);
});

test('creation', () => {
    expect(payment_creation_interactor).toBeDefined();
});

test('execute_use_case with empty file should return empty payments', () => {
    call_execute(payment_creation_interactor, []).then(payments => {
        expect(payments).toBeInstanceOf(Array);
        expect(payments.length).toBe(0);
    });
});


test('execute_use_case with filled file should return some payments', () => {
    let interactor = new PaymentCreationInteractor(presenter, CSVReaderDummy);
    call_execute(interactor, [1]).then(payments => {
        expect(payments).toBeInstanceOf(Array);
        expect(payments.length).toBe(1);
    });
});

it('should call response boundary', () => {

    let called = false
    // noinspection JSUnusedGlobalSymbols
    let presenter = {
        show: () => {
            called = true;
        }
    };
    let interactor = new PaymentCreationInteractor(presenter, CSVReaderDummy);

    call_execute(interactor, []).then(() => {
        expect(called).toBe(true);
    });
})