import {BrowserWindow} from 'electron';
import * as path from "path";
import {Domain} from "../common/domain/Domain";
import {create_request_channel} from "../common/ipc/RequestChannel";
import {UseCaseName} from "../common/usecase/UseCaseName";
import {UseCaseRequestChannelName} from "../common/usecase/UseCaseRequestChannelName";

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

        create_request_channel().register_receiver<UseCaseRequestChannelName>('use_case:create', (e, domain_name, use_case_name) => {
            this.execute_use_case(domain_name, use_case_name);
        })
    }

    execute_use_case(domain_name: string, use_case_name: UseCaseName) {
        let use_case = this._domains[domain_name].create_use_case(use_case_name);
        use_case.execute();
    }

    add_domain(domain: Domain) {
        this._domains[domain.domain_name] = domain;
    }
}
