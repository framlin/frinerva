const METHODS = {
    isReady () {
        // do any setup needed
        return true
    },
    // define your RPC-able methods here
    a_test () {
        return 42;
    },
    open_main_window() {
        // create_main_window();
        return 43;
    }
}
module.exports = METHODS;