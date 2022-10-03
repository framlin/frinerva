const {Controller} = require('./controller');
class ControllerFactory{
    static create(use_case_name: string){
        return new Controller[use_case_name]();
    }
}

module.exports = {ControllerFactory};
export {ControllerFactory}