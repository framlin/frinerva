"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
class UseCase {
    constructor(UseCaseFactory, domain_name, use_case_name) {
        this._UseCaseFactory = UseCaseFactory;
        this._use_case_name = use_case_name;
        this._domain_name = domain_name;
    }
    execute(...data) {
        if (this._presenter)
            this._presenter.execute(this._use_case_name, ...data);
        // this.view.show();
        // ==> view.presenter.ready
        // ==> presenter.controller.execute()
        // ==> controller.interactor.execute()
    }
    forward(use_case_name, ...data) {
        //@ts-ignore
        this._UseCaseFactory.create(use_case_name).execute(...data);
    }
    get presenter() {
        return this._presenter;
    }
    set presenter(value) {
        this._presenter = value;
    }
}
exports.UseCase = UseCase;
module.exports = { UseCase };
//# sourceMappingURL=UseCase.js.map