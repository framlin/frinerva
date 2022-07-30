const FileLoadingResponseBoundary = require("../../accounting/banking/file_loading/file_loading_response_boundary");

class CLIFileLoadingPresenter extends FileLoadingResponseBoundary {

    show(msg) {
        console.log(msg);
    }
}

module.exports = CLIFileLoadingPresenter;