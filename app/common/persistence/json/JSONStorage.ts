import {writeFile, readFile, access, mkdir, readdir, stat} from'fs/promises';
import {existsSync} from'fs';
import * as path from 'path';

export class JSONStorage {

    static async ensure_that_path_exists(file_name: string) {

        const separator = path.sep;
        const path_obj = path.parse(file_name);
        const dirs = path_obj.dir.split(separator);

        let curr_path = path_obj.root;

        for await (const dir of dirs) {
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
        let result: { dir_name: string|undefined; filename: string }[] = [];
        const filenames = await readdir(root_dir);
        for await (const filename of filenames) {
            const curr_path = path.join(root_dir, filename);
            const stats = await stat(curr_path);
            if (stats.isDirectory()) {
                const list =  await JSONStorage.get_name_list(curr_path, filename);
                result = result.concat(list);
            } else {
                result.push({dir_name, filename});
            }
        }
        return result;
    }

}
