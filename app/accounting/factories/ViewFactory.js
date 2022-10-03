"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewFactory = void 0;
const views_1 = require("./views");
let view_cache = {};
class ViewFactory {
    static create(use_case_name) {
        if (!(use_case_name in view_cache)) {
            // @ts-ignore
            view_cache[use_case_name] = new views_1.Views[use_case_name](use_case_name);
        }
        // @ts-ignore
        return view_cache[use_case_name];
    }
}
exports.ViewFactory = ViewFactory;
module.exports = { ViewFactory };
//# sourceMappingURL=ViewFactory.js.map