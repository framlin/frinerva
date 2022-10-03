"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowList = void 0;
const UseCase_1 = require("../../common/use_case/UseCase");
class ShowList extends UseCase_1.UseCase {
    constructor(_UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'show_list');
    }
}
exports.ShowList = ShowList;
module.exports = { ShowList };
//# sourceMappingURL=ShowList.js.map