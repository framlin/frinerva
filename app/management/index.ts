import {ManagementHelper} from "../common/persistence/helper/ManagementHelper";
import {Management} from "./entities/Management";
import {UseCases as ManagementUseCases} from "./usecases";
import {ManagementWorkspaceView} from "./workspace/ManagementWorkspaceView";

export const ManagementDomain = {
    usecases: ManagementUseCases,
    entity: Management,
    helper: ManagementHelper,
    workspace: ManagementWorkspaceView,
};