import {Observatory} from "../../common/observation/Observatory";

const {Controller} = require('./controller');
class ControllerFactory{
    static create(use_case_name: string, observatory: Observatory){
        let controller = new Controller[use_case_name]();
        controller.subscribe_at(observatory);
        return controller;
    }
}

module.exports = {ControllerFactory};
export {ControllerFactory}