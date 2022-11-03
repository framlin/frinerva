import {BrowserWindow} from 'electron';
import {TUseCaseName} from "../common/use_case/TUseCaseName";
import {Domain} from "../common/domain/Domain";
import * as path from "path";
import {register_IPCMain_listener} from "../common/ui/ipc/register_IPCMain_listener";

export class MainWindow extends BrowserWindow {
    _domains: Record<string, Domain> = {};

    constructor() {
        super({
            width: 1024,
            height: 768,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            },
            show: false
        });


        register_IPCMain_listener('use_case:create', (e, domain_name, use_case_name) => {
            this.execute_use_case(domain_name, use_case_name);
        })
    }

    _UseCaseFactory: any;

    set UseCaseFactory(value: any) {
        this._UseCaseFactory = value;
    }

    execute_use_case(domain_name: string, use_case_name: TUseCaseName) {
        let use_case = this._domains[domain_name].create_use_case(use_case_name);
        use_case.execute();
    }

    add_domain(domain: Domain) {
        this._domains[domain.domain_name] = domain;
    }
}
