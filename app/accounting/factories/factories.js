const factories = {
    controller: require('./ControllerFactory'),
    helper: require('./HelperFactory'),
    interactor: require('./InteractorFactory'),
    presenter: require('./PresenterFactory'),
    use_case: require('./UseCaseFactory'),
    workspace: require('./WorkspaceViewFactory')
}

module.exports = factories;