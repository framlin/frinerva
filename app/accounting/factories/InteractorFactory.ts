const Interactors = require('./interactors');

class InteractorFactory{
    static create(use_case_name: string) {
        return new Interactors[use_case_name]();
    }
}

module.exports = InteractorFactory;
export {InteractorFactory}