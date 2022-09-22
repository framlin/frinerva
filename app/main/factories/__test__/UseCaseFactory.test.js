const UseCaseFactory = require('../UseCaseFactory');
const InteractorFactory = require("../InteractorFactory");
const ControllerFactory = require("../ControllerFactory");
const HelperFactory = require("../HelperFactory");

const ReadCSVFile = require("../../../accounting/import/read_csv_file/ReadCSVFile");
const ReadCSVFileInteractor = require("../../../accounting/import/read_csv_file/ReadCSVFileInteractor");
const ReadCSVFileController = require("../../../accounting/import/read_csv_file/ReadCSVFileController");
const ReadCSVFileHelper = require("../../../accounting/import/read_csv_file/ReadCSVFileHelper");

const CreateAccount = require("../../../accounting/create/CreateAccount");
const CreateAccountInteractor = require("../../../accounting/create/CreateAccountInteractor");
const CreateAccountController = require("../../../accounting/create/CreateAccountController");
const CreateAccountHelper = require("../../../accounting/create/CreateAccountHelper");

class ReadCSVFilePresenterStub {}

class CreateAccountPresenterStub {}

class PresenterFactoryStub {
    static presenters = {
        read_csv_file: ReadCSVFilePresenterStub,
        create_account: CreateAccountPresenterStub,
    }

    static create(use_case_name) {
        return new this.presenters[use_case_name]()
    };
}

beforeAll(() => {
    UseCaseFactory.config(PresenterFactoryStub, InteractorFactory, ControllerFactory, HelperFactory);
})

function expect_use_case_creation(use_case_name, use_case_class, use_case_interactor, use_case_presenter, use_case_controller, use_case_helper) {
    let use_case = UseCaseFactory.create(use_case_name);
    expect(use_case).toBeInstanceOf(use_case_class);
    expect(use_case.interactor).toBeInstanceOf(use_case_interactor);
    expect(use_case.interactor.presenter).toBeInstanceOf(use_case_presenter);
    expect(use_case.interactor.helper).toBeInstanceOf(use_case_helper);

    expect(use_case.presenter).toBeInstanceOf(use_case_presenter);
    expect(use_case.presenter.controller).toBeInstanceOf(use_case_controller);

    expect(use_case.controller).toBeInstanceOf(use_case_controller);
    expect(use_case.controller.interactor).toBeInstanceOf(use_case_interactor);

    expect(use_case.helper).toBeInstanceOf(use_case_helper);

}

test('create read_csv_file', () => {
    expect_use_case_creation(
        'read_csv_file',
        ReadCSVFile,
        ReadCSVFileInteractor,
        ReadCSVFilePresenterStub,
        ReadCSVFileController,
        ReadCSVFileHelper
    );

})

test('create createAccount', () => {
    expect_use_case_creation(
        'create_account',
        CreateAccount,
        CreateAccountInteractor,
        CreateAccountPresenterStub,
        CreateAccountController,
        CreateAccountHelper
    );
});