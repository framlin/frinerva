const ImportCSVBankingStatementsInteractor = require("../../../src/accounting/banking/import_csv_banking_statements_interactor");


let import_csv_banking_statements_interactor;
const fileSelectionPresenter = {set_request_boundary: () => {}}

beforeAll(() => {

    import_csv_banking_statements_interactor = new ImportCSVBankingStatementsInteractor(fileSelectionPresenter);
})


test('creation', () => {
    expect(import_csv_banking_statements_interactor).toBeDefined();
    expect(import_csv_banking_statements_interactor.file_selection_presenter).toStrictEqual(fileSelectionPresenter);
    expect(import_csv_banking_statements_interactor.file_selection_interactor).not.toBeNull();
});
