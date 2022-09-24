window['accounting__read_csv_file'].register_event_listener(() => {
    register_next_button();
 });


function register_next_button() {
    let next_button = document.querySelector('.next-btn');
    next_button.addEventListener('click', () => {
        console.log("NEXT-BUTTON CLICKED")
        let booking_entries = get_booking_entries();
        window['accounting__read_csv_file'].send_next(booking_entries);
    });
}

function get_booking_entries() {
    return [1,2,3,4,5,6,7,8,9,0];
}

window["accounting__read_csv_file"].show_payments((event, payments) => {
    let payments_div = document.querySelector("#payment-entries");
    if (payments_div.firstChild) {
        _clear_payment_entries(payments_div);
    } else {
        let table = document.createElement("table");
        payments_div.appendChild(table);
        for (let payment of payments) {
            let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
            _add_payments_row(table, values);
        }

    }
});

function _clear_payment_entries(payments_div) {
    while (payments_div.firstChild) {
        try {
            payments_div.removeChild(payments_div.firstChild);
        } catch (e) {
        }
    }
}

function _add_payments_row(table, payments) {
    let row = table.insertRow(-1);
    payments.forEach((payment, i) => {
        let cell = row.insertCell(i);
        let text = document.createTextNode(payment);
        cell.appendChild(text);
    });
}
