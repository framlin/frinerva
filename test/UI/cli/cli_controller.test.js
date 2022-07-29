CLIController = require("../../../src/UI/cli/cli_file_loading_controller");
let cli_controller;
beforeAll(() => {
    cli_controller = new CLIController();
});

test('creation', () => {
    expect(cli_controller).toBeDefined();
});





