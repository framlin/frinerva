import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";
import {Blueprint} from "../../common/use_case/Blueprint";

export class HelperFactory{
    static create(blueprint: Blueprint) : UseCaseHelper{
        return new blueprint.helper();
    }
}
