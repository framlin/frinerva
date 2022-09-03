class UseCasePresenter{
    constructor() {
    }

    on_view_ready_to_show() {
        this.execute();
    }

    execute() {
        this._controller.execute();
    }

    forward(use_case_name) {
        this._controller.forward(use_case_name);
    }


    _view;
    _controller;

    get controller() {
        return this._controller;
    }

    set controller(value) {
        this._controller = value;
    }

    get view() {
        return this._view;
    }

    set view(value) {
        this._view = value;
        this._view.once('ready-to-show', () => {
            this.on_view_ready_to_show();
        });
    }
}

module.exports = UseCasePresenter;