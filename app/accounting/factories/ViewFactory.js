const Views = require('./views');

let view_cache = {}

class ViewFactory {
    static create(use_case_name) {
        if (!(use_case_name in view_cache)) {
            view_cache[use_case_name] = new Views[use_case_name](use_case_name);
        }
        return view_cache[use_case_name]
    }
}

module.exports = ViewFactory;