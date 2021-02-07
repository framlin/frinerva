function create_account_table(account) {
    let table = document.createElement('table');
    let tr, td, booking_entry, val;

    function create_payment_rows(type) {
        for (booking_entry in account[type]) {
            tr = document.createElement('tr');
            table.append(tr);
            for (val in account[type][booking_entry]) {
                td = document.createElement('td');
                td.innerHTML = account[type][booking_entry][val];
                tr.append(td)
            }
        }
    }

    create_payment_rows('_bookings');

    table.setAttribute('class', 'account_table');
    return table;
}