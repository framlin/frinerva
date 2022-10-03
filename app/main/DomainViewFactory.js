"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainViewFactory = void 0;
const WorkspaceViewFactory_1 = require("../accounting/factories/WorkspaceViewFactory");
const AccountingWorkspaceView_1 = require("../accounting/workspace/AccountingWorkspaceView");
const workspaces = {
    accounting: AccountingWorkspaceView_1.AccountingWorkspaceView,
};
const factories = {
    accounting: WorkspaceViewFactory_1.WorkspaceViewFactory,
};
class DomainViewFactory {
    static async create_workspace(domain_name) {
        // @ts-ignore
        return factories[domain_name]
            // @ts-ignore
            .config(workspaces[domain_name])
            .create();
    }
}
exports.DomainViewFactory = DomainViewFactory;
module.exports = { DomainViewFactory };
//# sourceMappingURL=DomainViewFactory.js.map