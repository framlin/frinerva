import {UseCaseInteractor} from "../../../common/usecase/UseCaseInteractor";

export class ShowListInteractor  extends UseCaseInteractor{
    execute(...data: any[]): any {
        console.log("BALANCING ShowListInteractor.execute");
    }
}