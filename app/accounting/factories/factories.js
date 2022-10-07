"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factories = void 0;
const UseCaseFactory_1 = require("./UseCaseFactory");
const ControllerFactory_1 = require("./ControllerFactory");
const HelperFactory_1 = require("./HelperFactory");
const InteractorFactory_1 = require("./InteractorFactory");
const PresenterFactory_1 = require("./PresenterFactory");
const factories = {
    controller: ControllerFactory_1.ControllerFactory,
    helper: HelperFactory_1.HelperFactory,
    interactor: InteractorFactory_1.InteractorFactory,
    presenter: PresenterFactory_1.PresenterFactory,
    use_case: UseCaseFactory_1.UseCaseFactory,
};
exports.factories = factories;
module.exports = { factories };
//# sourceMappingURL=factories.js.map