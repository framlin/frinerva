const Presenter = require('./presenter');
class PresenterFactory{
    static create(use_case_name, ipc_channel) {
        return new Presenter[use_case_name](ipc_channel);
    }
}

module.exports = PresenterFactory;



