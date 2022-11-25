import {AccountingHelper} from "../common/persistence/helper/AccountingHelper";
import {Accounting} from "./entites/Accounting";
import {UseCases as AccountingUseCases} from "./usecases";
import {AccountingWorkspaceView} from "./workspace/AccountingWorkspaceView";

export const AccountingDomain = {
    usecases: AccountingUseCases,
    entity: Accounting,
    helper: AccountingHelper,
    workspace: AccountingWorkspaceView,
}