"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseFactory = void 0;
const InteractorFactory_1 = require("./InteractorFactory");
const PresenterFactory_1 = require("./PresenterFactory");
const ControllerFactory_1 = require("./ControllerFactory");
const HelperFactory_1 = require("./HelperFactory");
const use_cases_1 = require("./use_cases");
function wire_use_case(use_case, interactor, presenter, controller, helper) {
    //order MATTERS
    use_case.presenter = presenter;
    interactor.response_boundary = presenter;
    interactor.helper = helper;
    controller.request_boundary = interactor;
    controller.use_case = use_case;
}
function create_use_case(use_case_name) {
    // @ts-ignore
    let use_case = new use_cases_1.UseCases[use_case_name](UseCaseFactory, use_case_name);
    let interactor = InteractorFactory_1.InteractorFactory.create(use_case_name);
    let presenter = PresenterFactory_1.PresenterFactory.create(use_case_name, UseCaseFactory.IPCChannel);
    let controller = ControllerFactory_1.ControllerFactory.create(use_case_name);
    let helper = HelperFactory_1.HelperFactory.create(use_case_name);
    wire_use_case(use_case, interactor, presenter, controller, helper);
    return use_case;
}
class UseCaseFactory {
    static create(use_case_name) {
        if (use_cases_1.UseCases[use_case_name]) {
            return create_use_case(use_case_name);
        }
        else {
            throw Error(`NO USE_CASE ${use_case_name}`);
        }
    }
}
exports.UseCaseFactory = UseCaseFactory;
module.exports = { UseCaseFactory };
//# sourceMappingURL=UseCaseFactory.js.map