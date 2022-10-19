import {UseCaseView} from "../../../common/ui/use_case/UseCaseView";
import {AccountData} from "../../account/Account";
import {ipcRenderer} from "electron";

let show_account_view: ShowAccountView;

export class ShowAccountView extends UseCaseView {

    constructor(use_case_name: string) {
        super('accounting', use_case_name);
        show_account_view = this;
    }

    show_account(account: AccountData){
        // ...
    }

    async create_view(): Promise<void> {
        await this.insert_markup_at(__dirname, '.workbench');
        this.link_styles(__dirname);
    }

    register_event_listener(): void {
    }
}

ipcRenderer.on('show_list:show_account_name_list', (e, account: AccountData) => {
    show_account_view.show_account(account);
})
