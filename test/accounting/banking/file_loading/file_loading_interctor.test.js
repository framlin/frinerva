const FileLoadingInteractor = require("../../../../src/accounting/banking/file_loading/file_loading_interactor");
const CLIFileLoadingPresenter = require("../../../../src/UI/cli/cli_file_loading_presenter");

let file_loading_interactor;
let file_loading_presenter = new CLIFileLoadingPresenter;

beforeAll(() => {
    file_loading_interactor = new FileLoadingInteractor(file_loading_presenter);
});

test('creation', () => {
    expect(file_loading_interactor).toBeDefined();
});

test('execute without filename should reject',  () => {
    return expect(file_loading_interactor.execute_use_case()).rejects.toStrictEqual(new Error("FileName missing"));
});

test('execute with filename should return a Promise',  () => {
    file_loading_interactor._load_file = () => {return "file"};
    return expect(file_loading_interactor.execute_use_case("file_name")).resolves.toBe("file");
});
