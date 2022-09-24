const Interactors = require('./interactors');

class InteractorFactory{
    static create(use_case_name) {
        return new Interactors[use_case_name]();
    }
}

module.exports = InteractorFactory;