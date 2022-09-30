
window["accounting__dispatch_booking_entries"].show_virtual_accounts(show_virtual_accounts);


window["accounting__dispatch_booking_entries"].register_event_listener((virtual_accounts) => {
    console.log("NEXT_BUTTON not implemented yet")
});

function show_virtual_accounts(virtual_accounts) {
    let virtual_account_list_elem = document.getElementById("virtual-account-list");
    while (virtual_account_list_elem.firstChild) {
        try {
            virtual_account_list_elem.removeChild(virtual_account_list_elem.firstChild);
        } catch (e) {
        }
    }

    for (let virtual_account of virtual_accounts) {
        show_virtual_account(virtual_account, virtual_accounts);
    }
}

function show_virtual_account(virtual_account, virtual_accounts){

    let virtual_account_list_elem = document.getElementById("virtual-account-list");
    let property_mapping = window["accounting__dispatch_booking_entries"].get_property_mapping();
    let account_div = TableRenderer.create_editable_table(
        `${virtual_account.booking_period} - ${virtual_account.cost_center}`,
        virtual_account.booking_entries,
        property_mapping,
        () => {
            show_virtual_accounts(virtual_accounts);
        });
    virtual_account_list_elem.appendChild(account_div);
}
