const ImportCSVBankingStatementsInteractor = require("../../../src/accounting/banking/import_csv_banking_statements_interactor");


let import_csv_banking_statements_interactor;

const response_boundaries = {
    file_loading_response_boundary: {},
    payment_creation_response_boundary: {}
}

beforeAll(() => {

    import_csv_banking_statements_interactor = new ImportCSVBankingStatementsInteractor(response_boundaries);
})


test('creation', () => {
    expect(import_csv_banking_statements_interactor).toBeDefined();
    expect(import_csv_banking_statements_interactor.file_loading_response_boundary).toStrictEqual(response_boundaries.file_loading_response_boundary);
    expect(import_csv_banking_statements_interactor.file_loading_request_boundary).not.toBeNull();
});
