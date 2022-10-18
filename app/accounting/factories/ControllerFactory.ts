import {Observatory} from "../../common/observation/Observatory";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";
import {UseCase} from "../../common/use_case/UseCase";

const {Controller} = require('./controller');
class ControllerFactory{
    static create(use_case_name: string, observatory: Observatory, request_boundary: UseCaseRequestBoundary, use_case: UseCase){
        let controller = new Controller[use_case_name](request_boundary);
        controller.subscribe_at(observatory);
        return controller;
    }
}

module.exports = {ControllerFactory};
export {ControllerFactory}