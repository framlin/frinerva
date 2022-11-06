import {ipcRenderer} from "electron";
import {register_IPCRenderer_listener} from "../../../../common/ui/ipc/register_IPCRenderer_listener";
import {UseCaseView} from "../../../../common/ui/use_case/UseCaseView";
import {TUseCaseName} from "../../../../common/use_case/TUseCaseName";
import {TShowListViewChannelName} from "./TShowListViewChannelName";

export class ShowListView extends UseCaseView {
    constructor(use_case_name: TUseCaseName) {
        super(use_case_name, 'accounting');
    }

    register_event_listener() {
        const account_list_div = document.querySelector('.sideboard-entry.account-list') as HTMLDivElement;
        if (account_list_div) {
            account_list_div.addEventListener('click', (event) => {
                const target = event.target as HTMLDivElement;
                if (target.classList.contains('sideboard-entry-list-entry')) {
                    ipcRenderer.send('show_list:account_selected', target.dataset.key);
                }
            });
        }
    }

    async create_view() {
        await this.append_markup_at(__dirname, '.sideboard');
        this.link_styles(__dirname);
        this.register_IPCRenderer_listener()
    };

    _clear_account_name_list(account_name_list: HTMLDivElement) {
        while (account_name_list.firstChild) {
            try {
                account_name_list.removeChild(account_name_list.firstChild);
            } catch (e) {
            }
        }
    }


    show_account_name_list(account_name_list: { account_name: string, key: string }[]) {
        const account_list_div = document.querySelector('.sideboard-entry.account-list') as HTMLDivElement;
        if (account_list_div) {
            this._clear_account_name_list(account_list_div);
            for (const entry of account_name_list) {
                const entry_div = document.createElement('div');
                entry_div.classList.add("sideboard-entry-list-entry", "clickable", "selectable");
                entry_div.innerHTML = entry.account_name;
                entry_div.setAttribute('data-key', entry.key);
                account_list_div.appendChild(entry_div);
            }
        }
    };

    private register_IPCRenderer_listener() {
        register_IPCRenderer_listener<TShowListViewChannelName>('show_list:show_account_name_list',
            (e, account_name_list: { account_name: string, key: string }[]) => {
                this.show_account_name_list(account_name_list);
            });
    }
}
