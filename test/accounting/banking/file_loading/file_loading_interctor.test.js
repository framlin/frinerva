const FileLoadingInteractor = require("../../../../src/accounting/banking/file_loading/file_loading_interactor");
const CLIFileLoadingPresenter = require("../../../../src/UI/cli/cli_file_loading_presenter");

let file_loading_interactor;
let file_loading_presenter = new CLIFileLoadingPresenter;

beforeAll(() => {
    file_loading_interactor = new FileLoadingInteractor(file_loading_presenter);
});

test('creation', () => {
    expect(file_loading_interactor).toBeDefined();
    expect(file_loading_interactor.response_boundary).toBeDefined();
    expect(file_loading_interactor.response_boundary).not.toBeNull();
});

test('execute without filename should prompt for filename', () => {
    let prompted = false;
    file_loading_presenter.file_name_missing = () => {
        prompted = true;
    }
    file_loading_interactor.execute_use_case();
    expect(prompted).toBe(true);
});

test('execute with filename should return a Promise', () => {

    file_loading_interactor.load_file = () => new Promise(() => {});

    async function call_execute() {
        return await file_loading_interactor.execute_use_case("file_name");
    }

    expect(call_execute()).toBeInstanceOf(Promise);
});
