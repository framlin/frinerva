import {WorkspaceViewFactory}  from '../accounting/factories/WorkspaceViewFactory';
import {AccountingWorkspaceView} from '../accounting/workspace/AccountingWorkspaceView';
const workspaces = {
    accounting: AccountingWorkspaceView,
}
const factories = {
    accounting: WorkspaceViewFactory,
}

class DomainViewFactory {
    static async create_workspace(domain_name: string) {
        // @ts-ignore
        return factories[domain_name]
            // @ts-ignore
            .config(workspaces[domain_name])
            .create();
    }
}

module.exports = {DomainViewFactory};
export {DomainViewFactory}