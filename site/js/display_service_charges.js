let service_charges = null;
let booking_entry_form = null;
let field_list = {
    '_amount':"amount_field",
    '_name':"name_field",
    '_subject':"subject_field",
    '_date':"date_field",
    '_booking_code':"booking_code_field",
    '_end_date':"end_date_field",
    '_portion':"portion_field",
    '_billable':"billable_field"
}

function forward_entries(from, to) {
    let from_balance = service_charges[from];
    let to_balance = service_charges[to];
    xhr_write('POST',
        {from: from, to: to},
        '/service_charges_forward/'+get_year(),
        getWriteRequestListener(get_year())
    );
}

function create_scs_table(data, data_index, elem_id, callbacks) {
        let scs_data = data[data_index];
        let scs_node = document.getElementById(elem_id)
        clear_node(scs_node)
        scs_node.append(create_account_table(scs_data['_accounts'][0], callbacks['tr_click'],
            {
                '_booking_code': 1,
                '_amount':1,
                '_name':1,
                '_subject': 1,
                '_portion': 1,
                '_billable': 1
            }))
}

function get_booking_entry(scs_type, dataset) {
    let scs_balance =  service_charges[scs_type];
    for (let i = 0; i < scs_balance['_accounts'].length; i++ ){
        let acc = scs_balance['_accounts'][i];
        let cost_center = acc['_cost_center'];
        if (cost_center === dataset.costCenter) {
            for (let bk = 0; bk < acc['_bookings'].length; bk++) {
                let booking = acc['_bookings'][bk]
                if (booking['_id'] === dataset.id) {
                    booking['_scs_type'] = scs_type
                    return booking;
                }
            }
        }
    }
}


function get_tr_click_callback(scs_type){
    return function tr_click(){
        let left = this.parentElement.offsetLeft + this.offsetLeft;
        let top = this.parentElement.offsetTop + this.offsetTop;
        booking_entry_form = new BookingEntryForm();
        booking_entry_form.open(left, top, get_booking_entry(scs_type, this.dataset), this.dataset, field_list);
    }
}

function show_scs_section(service_charges) {
        create_scs_table(service_charges, 'HOUSE', 'scs_house', {'tr_click': get_tr_click_callback('HOUSE')})
        create_scs_table(service_charges, 'DWELLING', 'scs_dwelling', {'tr_click': get_tr_click_callback('DWELLING')})
        create_scs_table(service_charges, 'RENTAL', 'scs_rental', {'tr_click': get_tr_click_callback('RENTAL')})
}

function getReadReqListener(year) {
    return function loadReqListener () {
        service_charges = this.response;
        service_charges['year'] = year;
        show_scs_section(service_charges);
    }
}

function getWriteRequestListener(year) {
    return function saveReqListener  () {
        if (this.readyState === 4 && this.status === 200) {
            service_charges = this.response;
            service_charges['year'] = year;
            show_scs_section(service_charges);
        }
    }
}

function load(){
    let year = get_year();
    xhr_read("/service-charges/"+ year, getReadReqListener(year));
}

function get_year() {
    let booking_periods = document.getElementById("booking_periods_select")
    return booking_periods.value
}

function send_write_request(method, data) {
    let year = get_year();
    xhr_write(method, data, "/service-charges/"+ year, getWriteRequestListener(year))
}

function update_booking_entry(booking_entry){
    send_write_request("POST", booking_entry)
}

function put_booking_entry(booking_entry) {
    send_write_request("PUT", booking_entry)
}


function delete_booking_entry(booking_entry) {
    send_write_request("DELETE", booking_entry)
}