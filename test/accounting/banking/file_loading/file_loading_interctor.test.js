const FileLoadingInteractor = require("../../../../src/accounting/banking/file_loading/file_loading_interactor");
const CLIFileLoadingPresenter = require("../../../../src/UI/cli/cli_file_loading_presenter");

let file_loading_interactor;
let file_loading_presenter = new CLIFileLoadingPresenter;

beforeAll(() => {
    file_loading_interactor = new FileLoadingInteractor(file_loading_presenter);
});

test('creation', () => {
    expect(file_loading_interactor).toBeDefined();
    expect(file_loading_interactor.file_loading_response_boundary).toBeDefined();
    expect(file_loading_interactor.file_loading_response_boundary).not.toBeNull();
});

test('execute should prompt for filename', () => {
    let prompted = false;
    file_loading_presenter.prompt_for_filename = () => {
        prompted = true;
        return new Promise(resolve => {})
    }
    file_loading_interactor.execute_use_case();
    expect(prompted).toBe(true);
});

