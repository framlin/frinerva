import {UseCaseHelper} from "../../common/use_case/UseCaseHelper";

const {Helper} = require('./helper');

export class HelperFactory{
    static create(use_case_name: string) : UseCaseHelper{
        return new Helper[use_case_name]();
    }
}
