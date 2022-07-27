CLIController = require("../../../../src/accounting/banking/cli/cli_controller");

test('creation', () => {
    let cli_controller = new CLIController();
    expect(cli_controller).toBeDefined();
})