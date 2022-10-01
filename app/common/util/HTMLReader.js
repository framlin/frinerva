"use strict";
const { readFile } = require('fs/promises');
class HTMLReader {
    static async read_html_file(full_file_name) {
        return await readFile(full_file_name, 'utf8');
    }
}
module.exports = HTMLReader;
//# sourceMappingURL=HTMLReader.js.map