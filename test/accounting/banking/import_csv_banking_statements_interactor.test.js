const ImportCSVBankingStatementsInteractor = require("../../../src/accounting/banking/import_csv_banking_statements_interactor");

let interactor;


describe('the integration of all use-cases', () => {
    beforeEach(() => {
        interactor = new ImportCSVBankingStatementsInteractor({});
    })

    test('creation', () => {
        expect(interactor).toBeDefined();
        expect(interactor.file_loading_request_boundary).not.toBeNull();
    });

    test('if the algorithm does run through',  () => {
        function dummy_use_case() {
            return Promise.resolve([]);
        }
        interactor._file_loading_interactor.execute_use_case = dummy_use_case;
        interactor._payment_creation_interactor.execute_use_case = dummy_use_case;
        interactor._payment_display_interactor.execute_use_case = dummy_use_case;
        interactor._payment_conversion_interactor.execute_use_case =  dummy_use_case;
        return expect(interactor.execute_use_case()).resolves.toBeInstanceOf(Array);
    });
})
