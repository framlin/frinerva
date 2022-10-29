import {Blueprint} from "../../common/use_case/Blueprint";
import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";

export class HelperFactory{
    static create(blueprint: Blueprint) : UseCaseHelper{
        return new blueprint.helper();
    }
}
