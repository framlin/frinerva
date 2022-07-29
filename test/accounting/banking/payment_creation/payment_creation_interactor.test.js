const PaymentCreationInteractor = require("../../../../src/accounting/banking/payment_creation/payment_creation_interactor");

let payment_creation_response_boundary = {
    show: () => {
    }
};

let payment_creation_interactor;

let CSVReaderDummy = class dummy {
    static create_payments(payments) {
        return new Promise(resolve => {
            resolve(payments);
        });
    }
}
beforeAll(() => {
    payment_creation_interactor = new PaymentCreationInteractor(payment_creation_response_boundary, CSVReaderDummy);
});

test('creation', () => {
    expect(payment_creation_interactor).toBeDefined();
    expect(payment_creation_interactor.response_boundary).not.toBeNull();
});

test('execute_use_case with empty file should return empty payments', () => {

    async function call_execute(payments) {
        return await payment_creation_interactor.execute_use_case(payments);
    }

    call_execute([]).then(payments => {
        expect(payments).toBeInstanceOf(Array);
        expect(payments.length).toBe(0);
    });

});

test('execute_use_case with filled file should return some payments', () => {

    async function call_execute(payments) {
        return await payment_creation_interactor.execute_use_case(payments);
    }

    payment_creation_interactor = new PaymentCreationInteractor(payment_creation_response_boundary, CSVReaderDummy);
    call_execute([1]).then(payments => {
        expect(payments).toBeInstanceOf(Array);
        expect(payments.length).toBe(1);
    });

});

it('should call response boundary', () => {
    async function call_execute(payments) {
        return await payment_creation_interactor.execute_use_case(payments);
    }

    let called = false
    let payment_creation_response_boundary = {
        show: () => {
            called = true;
        }
    };

    payment_creation_interactor = new PaymentCreationInteractor(payment_creation_response_boundary, CSVReaderDummy);
    call_execute([]).then(() => {
        expect(called).toBe(true);
    });
})