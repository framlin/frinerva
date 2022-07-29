const CLIFileSelectionPresenter = require("../../../src/UI/cli/cli_file_loading_presenter");
let cli_file_selection_presenter

beforeAll(() => {
    cli_file_selection_presenter = new CLIFileSelectionPresenter();

});

test('creation', () => {
    expect(cli_file_selection_presenter).toBeDefined();
})
