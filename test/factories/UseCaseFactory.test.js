const UseCaseFactory = require('../../factories/UseCaseFactory');
const PresenterFactory = require("../../factories/PresenterFactory");
const InteractorFactory = require("../../factories/InteractorFactory");
const ControllerFactory = require("../../factories/ControllerFactory");
const ReadCSVFile = require("../../use_cases/import/read_csv_file/ReadCSVFile");
const ReadCSVFileInteractor = require("../../use_cases/import/read_csv_file/ReadCSVFileInteractor");
const ReadCSVFilePresenter = require("../../use_cases/import/read_csv_file/ReadCSVFilePresenter");
const ReadCSVFileController = require("../../use_cases/import/read_csv_file/ReadCSVFileController");

//we need a Fake-Factory, because BrowserWindows are not testable
class ViewFactoryMock{
    static create() {
        return {}
    }
}

beforeAll(() => {
    UseCaseFactory.config(ViewFactoryMock, PresenterFactory, InteractorFactory, ControllerFactory);
})

function expect_use_case_creation(use_case_name, use_case_class, use_case_interactor, use_case_presenter, use_case_controller) {
    let use_case = UseCaseFactory.create(use_case_name);
    expect(use_case).toBeInstanceOf(use_case_class);
    expect(use_case.interactor).toBeInstanceOf(use_case_interactor);
    expect(use_case.interactor.presenter).toBeInstanceOf(use_case_presenter);

    expect(use_case.presenter).toBeInstanceOf(use_case_presenter);
    expect(use_case.presenter.controller).toBeInstanceOf(use_case_controller);
    expect(use_case.presenter.view).not.toBeUndefined();

    expect(use_case.controller).toBeInstanceOf(use_case_controller);
    expect(use_case.controller.interactor).toBeInstanceOf(use_case_interactor);

    expect(use_case.view).not.toBeUndefined();
    expect(use_case.view.presenter).toBeInstanceOf(use_case_presenter);
}

test('create read_csv_file', () => {
    expect_use_case_creation(
        'read_csv_file',
        ReadCSVFile,
        ReadCSVFileInteractor,
        ReadCSVFilePresenter,
        ReadCSVFileController
    );

})