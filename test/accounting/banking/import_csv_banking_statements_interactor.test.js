const ImportCSVBankingStatementsInteractor = require("../../../src/accounting/banking/import_csv_banking_statements_interactor");

let interactor;


describe('the integration of all use-cases', () => {
    beforeEach(() => {
        interactor = new ImportCSVBankingStatementsInteractor({});
    })
    function dummy_use_case() {
        return Promise.resolve([]);
    }

    test('creation', () => {
        expect(interactor).toBeDefined();
        expect(interactor.file_loading_request_boundary).not.toBeNull();
    });

    test('if the algorithm dor run through', async () => {
        interactor._file_loading_interactor.execute_use_case = dummy_use_case;
        interactor._payment_creation_interactor.execute_use_case = dummy_use_case;
        interactor._payment_display_interactor.execute_use_case = dummy_use_case;
        interactor._payment_conversion_interactor.execute_use_case =  dummy_use_case;
        const result = await interactor.execute_use_case();
        expect(result).toBeInstanceOf(Array);
    })
})
