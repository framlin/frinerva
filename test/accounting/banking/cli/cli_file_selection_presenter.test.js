const CLIFileSelectionPresenter = require("../../../../src/accounting/banking/cli/cli_file_selection_presenter");

test('creation', () => {
    let cli_file_selection_presenter = new CLIFileSelectionPresenter();
    expect(cli_file_selection_presenter).toBeDefined();
})
