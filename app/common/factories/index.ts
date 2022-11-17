import {DomainFactory} from "./DomainFactory";
import {UseCaseFactory} from './UseCaseFactory';
import {ViewFactory} from "./ViewFactory";
import {WorkspaceViewFactory} from "./WorkspaceViewFactory";

export const factories = {
    usecase: UseCaseFactory,
    view: ViewFactory,
    domain: DomainFactory,
    workspace: WorkspaceViewFactory
};
