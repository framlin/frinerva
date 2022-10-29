import {Observatory} from "../../common/observation/Observatory";
import {UseCase} from "../../common/use_case/UseCase";
import {UseCaseController} from "../../common/use_case/UseCaseController";
import {UseCaseRequestBoundary} from "../../common/use_case/UseCaseRequestBoundary";

export class ControllerFactory{
    static create(ctor: typeof UseCaseController,
                  observatory: Observatory,
                  request_boundary: UseCaseRequestBoundary,
                  use_case: UseCase)
    : UseCaseController {
        const controller = new ctor(request_boundary, use_case);
        controller.subscribe_at(observatory);
        return controller;
    }
}
