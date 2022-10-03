"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowList = void 0;
const UseCase = require("../../common/use_case/UseCase");
class ShowList extends UseCase {
    constructor(UseCaseFactory) {
        super(UseCaseFactory, 'accounting', 'show_list');
    }
}
exports.ShowList = ShowList;
module.exports = ShowList;
//# sourceMappingURL=ShowList.js.map