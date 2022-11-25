import {WorkspaceView} from "../../common/ui/workspace/WorkspaceView";
import {create_request_channel} from "../../common/ipc/RequestChannel";
import {UseCaseList} from "../../common/usecase/UseCaseList";
import {UseCaseRequestChannelName} from "../../common/usecase/UseCaseRequestChannelName";

export class AccountingWorkspaceView extends WorkspaceView {

    constructor(protected _UseCases: UseCaseList) {
        super(_UseCases);
        this.register_event_handler();
    }

    register_event_handler() {
        this.register_use_case_starter([
            '#read-csv-file',
            '#create-account'
        ]);
        this.register_sideboard_switches([
            '#cost-center-board-switch',
            '#account-board-switch'
        ]);
    }
}
