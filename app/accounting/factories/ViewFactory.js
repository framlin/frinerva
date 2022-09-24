const Views = require('./views');

class ViewFactory {
    static create(use_case_name){
        return new Views[use_case_name](use_case_name);
    }
}

module.exports = ViewFactory;