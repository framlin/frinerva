const UseCaseFactory = require('../../factories/UseCaseFactory');
const PresenterFactory = require("../../factories/PresenterFactory");
const InteractorFactory = require("../../factories/InteractorFactory");
const ControllerFactory = require("../../factories/ControllerFactory");
const ReadCSVFile = require("../../business/accounting/import/read_csv_file/ReadCSVFile");
const ReadCSVFileInteractor = require("../../business/accounting/import/read_csv_file/ReadCSVFileInteractor");
const ReadCSVFilePresenter = require("../../business/accounting/import/read_csv_file/ReadCSVFilePresenter");
const ReadCSVFileController = require("../../business/accounting/import/read_csv_file/ReadCSVFileController");
const HelperFactory = require("../../factories/HelperFactory");
const ReadCSVFileHelper = require("../../business/accounting/import/read_csv_file/ReadCSVFileHelper");

//we need a View-Fake-Factory, because BrowserWindows are not testable
class ViewFactoryStub{
    static create() {
        return {
            once: () => null
        }
    }
}

beforeAll(() => {
    UseCaseFactory.config(ViewFactoryStub, PresenterFactory, InteractorFactory, ControllerFactory, HelperFactory);
})

function expect_use_case_creation(use_case_name, use_case_class, use_case_interactor, use_case_presenter, use_case_controller, use_case_helper) {
    let use_case = UseCaseFactory.create(use_case_name);
    expect(use_case).toBeInstanceOf(use_case_class);
    expect(use_case.interactor).toBeInstanceOf(use_case_interactor);
    expect(use_case.interactor.presenter).toBeInstanceOf(use_case_presenter);
    expect(use_case.interactor.helper).toBeInstanceOf(use_case_helper);

    expect(use_case.presenter).toBeInstanceOf(use_case_presenter);
    expect(use_case.presenter.controller).toBeInstanceOf(use_case_controller);
    expect(use_case.presenter.view).not.toBeUndefined();

    expect(use_case.controller).toBeInstanceOf(use_case_controller);
    expect(use_case.controller.interactor).toBeInstanceOf(use_case_interactor);

    expect(use_case.helper).toBeInstanceOf(use_case_helper);

    expect(use_case.view).not.toBeUndefined();
    expect(use_case.view.presenter).toBeInstanceOf(use_case_presenter);
}

test('create read_csv_file', () => {
    expect_use_case_creation(
        'read_csv_file',
        ReadCSVFile,
        ReadCSVFileInteractor,
        ReadCSVFilePresenter,
        ReadCSVFileController,
        ReadCSVFileHelper
    );

})