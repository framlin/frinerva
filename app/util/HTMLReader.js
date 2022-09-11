const {writeFile, readFile, access, mkdir} = require('fs/promises');
const path = require('path');

class HTMLReader {
    static async read_html_file(full_file_name) {
        return await readFile(full_file_name, 'utf8');
    }
}

module.exports = HTMLReader;