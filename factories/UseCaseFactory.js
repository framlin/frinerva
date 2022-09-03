const ReadCSVFile = require("../use_cases/import/read_csv_file/ReadCSVFile");

function create_interactor(use_case, use_case_name) {
    let interactor = UseCaseFactory.InteractorFactory.create(use_case_name);
    use_case.interactor = interactor;
    return interactor;
}

function create_presenter(use_case, use_case_name) {
    let presenter = UseCaseFactory.PresenterFactory.create(use_case_name);
    use_case.presenter = presenter;
    return presenter;
}

function create_controller(use_case, use_case_name) {
    let controller = UseCaseFactory.ControllerFactory.create(use_case_name);
    use_case.controller = controller;
    return controller;
}

function create_view(use_case, use_case_name) {
    let view = UseCaseFactory.ViewFactory.create(use_case_name);
    use_case.view = view;
    return view;
}

function wire_use_case(interactor, presenter, view, controller) {
    interactor.presenter = presenter;
    presenter.view = view;
    presenter.controller = controller;
    view.presenter = presenter;
    controller.interactor = interactor;
}

function create_use_case(use_case_name) {
    let use_case = new UseCases[use_case_name]();
    let interactor = create_interactor(use_case, use_case_name);
    let presenter = create_presenter(use_case, use_case_name);
    let controller = create_controller(use_case, use_case_name);
    let view = create_view(use_case, use_case_name);
    wire_use_case(interactor, presenter, view, controller);
    return use_case;
}

const UseCases = {
    read_csv_file: ReadCSVFile
}


class UseCaseFactory {
    static ViewFactory;
    static PresenterFactory;
    static InteractorFactory;
    static ControllerFactory;

    static config(ViewFactory, PresenterFactory, InteractorFactory, ControllerFactory) {
        this.ViewFactory = ViewFactory;
        this.PresenterFactory = PresenterFactory;
        this.InteractorFactory = InteractorFactory;
        this.ControllerFactory = ControllerFactory;
    }


    static create(use_case_name) {
        return create_use_case(use_case_name);
    }
}

module.exports = UseCaseFactory;