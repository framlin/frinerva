import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";

export class HelperFactory{
    static create(ctor: typeof UseCaseHelper) : UseCaseHelper{
        return new ctor();
    }
}
