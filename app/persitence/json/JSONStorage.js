const { writeFile, readFile} = require('fs/promises');

class JSONStorage{
    static async save(file_name, json) {
        await writeFile(file_name, json);
    }
    static async load(file_name) {
        return await readFile(file_name, 'utf8');
    }
}

module.exports = JSONStorage;