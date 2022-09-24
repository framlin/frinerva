const Helper = require('./helper');

class HelperFactory{
    static create(use_case_name) {
        return new Helper[use_case_name]();
    }
}

module.exports = HelperFactory;