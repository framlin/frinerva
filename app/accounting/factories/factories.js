const {UseCaseFactory} = require('./UseCaseFactory')

const factories = {
    controller: require('./ControllerFactory'),
    helper: require('./HelperFactory'),
    interactor: require('./InteractorFactory'),
    presenter: require('./PresenterFactory'),
    use_case: UseCaseFactory,
}

module.exports = factories;