import {Observatory} from "../../common/observation/Observatory";
import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";

export class ControllerFactory{
    static create(blueprint: Blueprint,
                  observatory: Observatory,
                  request_boundary: UseCaseRequestBoundary,
                  use_case: UseCase)
    : UseCaseController {
        let controller = new blueprint.controller(request_boundary, use_case);
        controller.subscribe_at(observatory);
        return controller;
    }
}
