const ImportCSVBankingStatementsInteractor = require("../../../src/accounting/banking/import_csv_banking_statements_interactor");

test('creation', () => {
    let import_csv_banking_statements_interactor = new ImportCSVBankingStatementsInteractor();
    expect(import_csv_banking_statements_interactor).toBeDefined();
});