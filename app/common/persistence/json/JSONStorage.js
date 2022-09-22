const { writeFile, readFile, access, mkdir} = require('fs/promises');
const {existsSync} = require('fs');
const path = require('path');

class JSONStorage{

    static async ensure_that_path_exists(file_name) {

        let separator = path.sep;
        let path_obj = path.parse(file_name);
        let dirs = path_obj.dir.split(separator);

        let curr_path = path_obj.root;

        for await (let dir of dirs) {
            curr_path = path.join(curr_path,dir);
            await access(curr_path).then().catch(async () => {
                await mkdir(curr_path);
            })
        }
    }

    static async save(file_name, json) {
        await this.ensure_that_path_exists(file_name);
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