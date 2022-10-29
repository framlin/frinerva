import {ControllerFactory} from './ControllerFactory';
import {HelperFactory} from './HelperFactory';
import {InteractorFactory} from './InteractorFactory';
import {PresenterFactory} from './PresenterFactory'
import {UseCaseFactory} from './UseCaseFactory';

export const factories = {
    controller: ControllerFactory,
    helper: HelperFactory,
    interactor: InteractorFactory,
    presenter: PresenterFactory,
    use_case: UseCaseFactory,
}
