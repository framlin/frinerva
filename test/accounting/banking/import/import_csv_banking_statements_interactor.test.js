const ImportCSVBankingStatementsInteractor = require("../../../../src/accounting/banking/csv_import/import_csv_banking_statements_interactor");

let interactor;


describe('the integration of all use-cases', () => {
    beforeEach(() => {
        interactor = new ImportCSVBankingStatementsInteractor({});
    })

    test('creation', () => {
        expect(interactor).toBeDefined();
    });

    test.skip('if the algorithm does run through',  () => {
         return expect(interactor.execute_use_case()).resolves.toBeInstanceOf(Array);
    });
})
