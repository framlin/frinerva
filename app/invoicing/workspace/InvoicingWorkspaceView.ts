import {WorkspaceView} from "../../common/ui/workspace/WorkspaceView";
import {UseCaseList} from "../../common/usecase/UseCaseList";

export class InvoicingWorkspaceView extends WorkspaceView {

    constructor(protected _UseCases: UseCaseList) {
        super(_UseCases);
        this.register_event_handler();
    }

    register_event_handler() {}
}