function clear_node(node) {
    if (node.hasChildNodes()) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}

function create_account_table(account, tr_click_handler) {
    let table = document.createElement('table');
    let tr, td, booking_entry, col, val;

    function create_payment_rows(type) {
        for (booking_entry in account[type]) {
            tr = document.createElement('tr');
            tr.addEventListener("click", tr_click_handler)
            tr.setAttribute("data-id", account[type][booking_entry]['_id'])
            tr.setAttribute("data-cost-center", account["_cost_center"])
            table.append(tr);
            for (col in account[type][booking_entry]) {
                val = account[type][booking_entry][col];
                if (col !== '_id') {
                    // tr.setAttribute("data-booking-entry", val);
                    if (col === '_amount') {
                        val = '<b>' + format_number(val, 2) + ' €</b>'
                    }
                    td = document.createElement('td');
                    td.innerHTML = val;
                    tr.append(td);
                }
            }
        }
    }

    create_payment_rows('_bookings');

    table.setAttribute('class', 'account_table');
    return table;
}

function format_number(num, digits) {
    num = "" + num;

    if (num.length == 0) {
        return "";
    }

    var i = num.lastIndexOf(".");

    var n = 0;

    if (digits == 0) {
        // exclude decimal seperator
        return num.substring(0, i != -1 ? i : num.length);
    }

    if (i == -1) {
        num += ".";

        n = digits;
    } else {
        var num_digits = num.length - i - 1;

        if (digits >= num_digits) {
            n = digits - num_digits;
        } else {
            num = num.substring(0, i + digits + 1);
        }
    }

    while (n--) {
        num += "0";
    }
    return num;
}
