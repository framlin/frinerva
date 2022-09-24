let is_ready = false;

const METHODS = {
    set_ready() {
        is_ready = true;
    },

    isReady () {
        // do any setup needed
        return true
    },
    // define your RPC-able methods here
    a_test () {
        return 42;
    },

}
module.exports = METHODS;