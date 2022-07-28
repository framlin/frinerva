const CLIFileSelectionPresenter = require("../../../../src/accounting/banking/cli/cli_file_selection_presenter");
let cli_file_selection_presenter

beforeAll(() => {
    cli_file_selection_presenter = new CLIFileSelectionPresenter();

});

test('creation', () => {
    expect(cli_file_selection_presenter).toBeDefined();
})
