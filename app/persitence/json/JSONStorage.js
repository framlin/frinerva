const { writeFile, readFile} = require('fs/promises');
const {existsSync} = require('fs');

class JSONStorage{
    static async save(file_name, json) {
        await writeFile(file_name, json);
    }
    static async load(file_name) {
        return await readFile(file_name, 'utf8');
    }

    static exists(file_name) {
        return existsSync(file_name);
    }
}

module.exports = JSONStorage;