const { ipcRenderer} = require('electron')

const UseCaseFactory = require("../../../factories/UseCaseFactory");
const csv_file_import = UseCaseFactory.create('cvs_file_import');
const booking_entry_dispatch = UseCaseFactory.create('booking_entry_dispatch');

window.addEventListener('DOMContentLoaded', (event) => {
    if (event.target.URL.indexOf('import.html') !== -1) {

        ipcRenderer.on('file:selected', (_event, path) => {
            csv_file_import.controller.import_file(path);
        });

        let payments_link = document.getElementById('payments_link');
        payments_link.addEventListener('click', (_event) => {
            csv_file_import.view.show_payments(csv_file_import.controller.payments);
        });

        let commit_button = document.getElementById("commit");
        commit_button.addEventListener('click', () => {
            ipcRenderer.send('import:commited', csv_file_import.controller.booking_entries);
        });

    } else if (event.target.URL.indexOf('dispatch.html') !== -1) {

        ipcRenderer.on('import:dispatch', (_event, booking_records) => {
            booking_entry_dispatch.controller.dispatch(booking_records);
        });

        let commit_button = document.getElementById("dispatch-commit");
        commit_button.addEventListener('click', () => {
            ipcRenderer.send('dispatch:commited', csv_file_import.controller.booking_entries);
        });
    }
});


window.show_virtual_accounts = (cost_center, booking_period, booking_entry_property_mapping) => {
    booking_entry_dispatch.view.show_virtual_accounts(
        booking_entry_dispatch.controller.virtual_accounts,
        cost_center,
        booking_period,
        booking_entry_property_mapping
    );
};
