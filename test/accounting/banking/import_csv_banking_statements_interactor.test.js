const ImportCSVBankingStatementsInteractor = require("../../../src/accounting/banking/import_csv_banking_statements_interactor");


let import_csv_banking_statements_interactor;

beforeAll(() => {
    import_csv_banking_statements_interactor = new ImportCSVBankingStatementsInteractor({a:1});
})

test('creation', () => {
    expect(import_csv_banking_statements_interactor).toBeDefined();
    expect(import_csv_banking_statements_interactor.file_selection_presenter).toStrictEqual({a:1});
    expect(import_csv_banking_statements_interactor.file_selection_interactor).not.toBeNull();
});
