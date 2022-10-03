"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceViewFactory = void 0;
class WorkspaceViewFactory {
    static config(accountingWS) {
        WorkspaceViewFactory.AccountingWorkspace = accountingWS;
        return WorkspaceViewFactory;
    }
    ;
    static async create() {
        await WorkspaceViewFactory.AccountingWorkspace.create_workspace();
        return new WorkspaceViewFactory.AccountingWorkspace();
    }
}
exports.WorkspaceViewFactory = WorkspaceViewFactory;
module.exports = { WorkspaceViewFactory };
//# sourceMappingURL=WorkspaceViewFactory.js.map