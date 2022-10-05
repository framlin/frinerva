const {writeFile, readFile, access, mkdir, readdir, stat} = require('fs/promises');
const {existsSync} = require('fs');
const path = require('path');

class JSONStorage {

    static async ensure_that_path_exists(file_name: string) {

        let separator = path.sep;
        let path_obj = path.parse(file_name);
        let dirs = path_obj.dir.split(separator);

        let curr_path = path_obj.root;

        for await (let dir of dirs) {
            curr_path = path.join(curr_path, dir);
            await access(curr_path).then().catch(async () => {
                await mkdir(curr_path);
            })
        }
    }

    static async save(file_name: string, json: string) {
        await this.ensure_that_path_exists(file_name);
        await writeFile(file_name, json);
    }

    static async load(file_name: string) {
        return await readFile(file_name, 'utf8');
    }

    static exists(file_name: string) {
        return existsSync(file_name);
    }

    static async get_name_list(root_dir: string, dir_name?: string) {
        let result: any[] = [];
        let filenames = await readdir(root_dir);
        for await (let filename of filenames) {
            let curr_path = path.join(root_dir, filename);
            let stats = await stat(curr_path);
            if (stats.isDirectory()) {
                let list =  await JSONStorage.get_name_list(curr_path, filename);
                result = result.concat(list);
            } else {
                result.push({dir_name, filename});
            }
        }
        return result;
    }

}

module.exports = {JSONStorage};
export {JSONStorage}