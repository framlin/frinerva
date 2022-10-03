import {UseCaseFactory} from './UseCaseFactory';
import {ControllerFactory} from './ControllerFactory';
import {HelperFactory} from './HelperFactory';
import {InteractorFactory} from './InteractorFactory';
import {PresenterFactory} from './PresenterFactory'

const factories = {
    controller: ControllerFactory,
    helper: HelperFactory,
    interactor: InteractorFactory,
    presenter: PresenterFactory,
    use_case: UseCaseFactory,
}

module.exports = {factories};