const {readFile} = require('fs/promises');

class HTMLReader {
    static async read_html_file(full_file_name:string) {
        return await readFile(full_file_name, 'utf8');
    }
}

module.exports = HTMLReader;