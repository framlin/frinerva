const FileSelectionInteractor = require("../../../../src/accounting/banking/file_loading/file_loading_interactor");
const CLIFileSelectionPresenter = require("../../../../src/accounting/banking/cli/cli_file_selection_presenter");

let file_selection_interactor;
let file_selection_presenter = new CLIFileSelectionPresenter;

beforeAll(() => {
    file_selection_interactor = new FileSelectionInteractor(file_selection_presenter);
});

test('creation', () => {
    expect(file_selection_interactor).toBeDefined();
    expect(file_selection_interactor.file_selection_presenter).toBeDefined();
    expect(file_selection_interactor.file_selection_presenter).not.toBeNull();
});

test('execute should prompt for filename', () => {
    let prompted = false;
    file_selection_presenter.prompt_for_filename = () => {
        prompted = true;
    }
    file_selection_interactor.execute_use_case();
    expect(prompted).toBe(true);
});

