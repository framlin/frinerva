import {BalancingHelper} from "../common/persistence/helper/BalancingHelper";
import {Balancing} from "./entities/Balancing";
import {UseCases as BalancingUseCases} from "./usecases";
import {BalancingWorkspaceView} from "./workspace/BalancingWorkspaceView";

export const BalancingDomain = {
    usecases: BalancingUseCases,
    entity: Balancing,
    helper: BalancingHelper,
    workspace: BalancingWorkspaceView,
};