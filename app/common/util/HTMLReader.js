"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLReader = void 0;
const { readFile } = require('fs/promises');
class HTMLReader {
    static async read_html_file(full_file_name) {
        return await readFile(full_file_name, 'utf8');
    }
}
exports.HTMLReader = HTMLReader;
module.exports = { HTMLReader };
//# sourceMappingURL=HTMLReader.js.map