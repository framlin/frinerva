import {InvoicingHelper} from "../common/persistence/helper/InvoicingHelper";
import {Invoicing} from "./entities/Invoicing";
import {UseCases as InvoicingUseCases} from "./usecases";
import {InvoicingWorkspaceView} from "./workspace/InvoicingWorkspaceView";

export const InvoicingDomain = {
    usecases: InvoicingUseCases,
    entity: Invoicing,
    helper: InvoicingHelper,
    workspace: InvoicingWorkspaceView,
};