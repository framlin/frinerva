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
    get interactor() {
        return this._interactor;
    }
    set interactor(value) {
        this._interactor = value;
    }
    get controller() {
        return this._controller;
    }
    set controller(value) {
        this._controller = value;
    }
    get presenter() {
        return this._presenter;
    }
    set presenter(value) {
        this._presenter = value;
    }
    get helper() {
        return this._helper;
    }
    set helper(value) {
        this._helper = value;
    }
}
exports.UseCase = UseCase;
module.exports = { UseCase };
//# sourceMappingURL=UseCase.js.map