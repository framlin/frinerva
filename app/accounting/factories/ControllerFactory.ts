import {Observatory} from "../../common/observation/Observatory";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseController} from "../../common/use_case/UseCaseController";

const {Controller} = require('./controller');
class ControllerFactory{
    static create(use_case_name: string,
                  observatory: Observatory,
                  request_boundary: UseCaseRequestBoundary,
                  use_case: UseCase)
    : UseCaseController {
        let controller = new Controller[use_case_name](request_boundary, use_case);
        controller.subscribe_at(observatory);
        return controller;
    }
}

module.exports = {ControllerFactory};
export {ControllerFactory}