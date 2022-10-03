"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainViewFactory = void 0;
const workspaces = {
    accounting: require('../accounting/workspace/AccountingWorkspaceView'),
};
const factories = {
    accounting: require('../accounting/factories/WorkspaceViewFactory'),
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