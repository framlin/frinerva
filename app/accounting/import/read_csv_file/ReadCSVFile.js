"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSVFile = void 0;
const UseCase_1 = require("../../../common/use_case/UseCase");
class ReadCSVFile extends UseCase_1.UseCase {
    constructor(_UseCaseFactory) {
        super(_UseCaseFactory, 'accounting', 'read_csv_file');
    }
}
exports.ReadCSVFile = ReadCSVFile;
module.exports = { ReadCSVFile };
//# sourceMappingURL=ReadCSVFile.js.map