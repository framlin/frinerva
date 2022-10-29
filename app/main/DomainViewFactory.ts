import {WorkspaceViewFactory}  from '../accounting/factories/WorkspaceViewFactory';
import {AccountingWorkspaceView} from '../accounting/workspace/AccountingWorkspaceView';
import {WorkspaceView} from "../common/ui/workspace/WorkspaceView";

const workspaces : Record<string, typeof WorkspaceView> = {
    accounting: AccountingWorkspaceView,
}
const factories: Record<string, typeof WorkspaceViewFactory> = {
    accounting: WorkspaceViewFactory,
}

class DomainViewFactory {
    static async create_workspace(domain_name: string) {
        return factories[domain_name]
            .config(workspaces[domain_name])
            .create();
    }
}

module.exports = {DomainViewFactory};
export {DomainViewFactory}