const ImportCSVBankingStatementsInteractor = require("../../../use_cases/import/CSVFileImportInteractor");

let interactor;


describe('the integration of all use-cases', () => {
    beforeEach(() => {
        interactor = new ImportCSVBankingStatementsInteractor({});
    })

    test('creation', () => {
        expect(interactor).toBeDefined();
    });

})
