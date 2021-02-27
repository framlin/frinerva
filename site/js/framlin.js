function clear_node(node) {
    if (node.hasChildNodes()) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}

function create_account_table(account, tr_click_handler, columns) {
    let table = document.createElement('table');
    let tr, td, booking_entry, col, val;

    for (booking_entry in account['_bookings']) {
        tr = document.createElement('tr');
        tr.addEventListener("click", tr_click_handler)
        tr.setAttribute("data-id", account['_bookings'][booking_entry]['_id'])
        tr.setAttribute("data-cost-center", account["_cost_center"])
        table.append(tr);
        // for (col in account['_bookings'][booking_entry]) {
            for (col in columns) {
                val = account['_bookings'][booking_entry][col];
                if (col !== '_id') {
                    if (col === '_amount') {
                        val = '<b>' + format_number(val, 2) + ' €</b>'
                    }
                    td = document.createElement('td');
                    td.innerHTML = val;
                    tr.append(td);
                }
            }
        // }
    }

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

function xhr_read(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", callback);
    xhr.responseType = 'json';
    xhr.open("GET", url);
    xhr.send();
}

function xhr_write(method, data, url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener("load", callback);
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");

    let json_data = JSON.stringify(data);
    xhr.send(json_data);

}