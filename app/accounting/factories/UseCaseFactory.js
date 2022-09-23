const ReadCSVFile = require("../import/read_csv_file/ReadCSVFile");
const CreateAccount = require("../create/CreateAccount");

function create_interactor(use_case, use_case_name) {
    let interactor = UseCaseFactory.InteractorFactory.create(use_case_name);
    use_case.interactor = interactor;
    return interactor;
}

function create_presenter(use_case, use_case_name) {
    let presenter = UseCaseFactory.PresenterFactory.create(use_case_name, UseCaseFactory.IPCChannel);
    use_case.presenter = presenter;
    return presenter;
}

function create_controller(use_case, use_case_name) {
    let controller = UseCaseFactory.ControllerFactory.create(use_case_name);
    use_case.controller = controller;
    return controller;
}

function create_helper(use_case, use_case_name) {
    let helper = UseCaseFactory.HelperFactory.create(use_case_name);
    use_case.helper = helper;
    return helper;
}

function wire_use_case(use_case, interactor, presenter, controller, helper) {
    //order MATTERS
    interactor.presenter = presenter;
    interactor.helper = helper;
    controller.interactor = interactor;
    controller.use_case = use_case;
    presenter.controller = controller;
}

function create_use_case(use_case_name) {
    let use_case = new UseCases[use_case_name](UseCaseFactory, use_case_name);
    let interactor = create_interactor(use_case, use_case_name);
    let presenter = create_presenter(use_case, use_case_name);
    let controller = create_controller(use_case, use_case_name);
    let helper = create_helper(use_case, use_case_name);
    wire_use_case(use_case, interactor, presenter, controller, helper);
    return use_case;
}

const UseCases = {
    read_csv_file: ReadCSVFile,
    create_account: CreateAccount,
}


class UseCaseFactory {
    static PresenterFactory;
    static InteractorFactory;
    static ControllerFactory;
    static HelperFactory;
    static IPCChannel;

    static config(PresenterFactory, InteractorFactory, ControllerFactory, HelperFactory, IPCChannel) {
        this.PresenterFactory = PresenterFactory;
        this.InteractorFactory = InteractorFactory;
        this.ControllerFactory = ControllerFactory;
        this.HelperFactory = HelperFactory;
        this.IPCChannel = IPCChannel;
    }


    static create(use_case_name) {
        if (use_case_name in UseCases) {
            return create_use_case(use_case_name);
        } else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}

module.exports = UseCaseFactory;