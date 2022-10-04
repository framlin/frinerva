// @ts-ignore
// window['accounting__read_csv_file'].register_event_listener(() => {
//     register_next_button();
// });


// function register_next_button() {
//     let next_button = document.querySelector('.next-btn');
//     if (next_button) {
//         next_button.addEventListener('click', () => {
//             let booking_entries = get_booking_records();
//             // @ts-ignore
//             window['accounting__read_csv_file'].send_next(booking_entries);
//         });
//
//     }
// }

// function get_booking_records() {
//     let booking_records: any[] = [];
//     let rows = document.querySelectorAll('#payment-entries > table tr');
//     rows.forEach((row) => {
//         // @ts-ignore
//         booking_records.push(row.booking_record);
//     })
//     return booking_records;
// }

// @ts-ignore
// window["accounting__read_csv_file"].show_payments((payments) => {
//     let payments_div = document.querySelector("#payment-entries") as HTMLDivElement;
//     if (payments_div) {
//         if (payments_div.firstChild) {
//             _clear_payment_entries(payments_div);
//         } else {
//             let table = document.createElement("table");
//             payments_div.appendChild(table);
//             for (let payment of payments) {
//                 let values = [payment.Datum, payment.Kategorie, payment.Name, payment.Betrag]
//                 _add_payments_row(table, values);
//             }
//         }
//     }
// });

// function _clear_payment_entries(payments_div: HTMLDivElement) {
//     while (payments_div.firstChild) {
//         try {
//             payments_div.removeChild(payments_div.firstChild);
//         } catch (e) {
//         }
//     }
// }
//
// function _add_payments_row(table: HTMLTableElement, payments: any[]) {
//     let row = table.insertRow(-1);
//     payments.forEach((payment, i) => {
//         let cell = row.insertCell(i);
//         let text = document.createTextNode(payment);
//         cell.appendChild(text);
//     });
// }
