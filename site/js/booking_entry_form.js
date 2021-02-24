function BookingEntryForm(service_charges) {
    this.service_charges = service_charges;
    console.log(this.service_charges);
    this.dom_object = document.getElementById('booking_entry_form');
    this.inputs = this.dom_object.getElementsByTagName('input');
    this.buttons = this.dom_object.getElementsByTagName('button');
    this._is_created = false;
    this._created_entry = null;
};

BookingEntryForm.prototype.close = function close() {
    // let booking_entry_form = document.getElementById('booking_entry_form');
    this.dom_object.classList.add('collapsed');
};

BookingEntryForm.prototype.clear = function clear() {
    for (let i = 0; i < this.inputs.length; i += 1) {
        let input = this.inputs[i];
        input.value = "";
    }
};

BookingEntryForm.prototype.update_entry = function update_entry(booking_entry, is_new) {
    let amount = document.getElementById('amount_field').value;
    let name = document.getElementById('name_field').value;
    let subject = document.getElementById("subject_field").value;
    let date = document.getElementById("date_field").value;
    let booking_code = document.getElementById("booking_code_field").value;
    let end_date = document.getElementById("end_date_field").value;
    let portion = document.getElementById("portion_field").value ;
    let billable = document.getElementById("billable_field").value ;


    booking_entry['_amount'] = amount;
    booking_entry['_name'] = name;
    booking_entry['_subject'] = subject;
    booking_entry['_date'] = date;
    booking_entry['_booking_code'] = booking_code;
    booking_entry['_end_date'] = end_date;
    booking_entry['_portion'] = portion;
    booking_entry['_billable'] = billable;
    if (is_new) {
        booking_entry['_new'] = true;
    } else {
        booking_entry['_dirty'] = true;
    }

}

BookingEntryForm.prototype.save =  function save(){
    if (!this._is_created) {
        this.update_entry(this.dom_object.booking_entry, false);
        save_service_charges();
    } else {
        this.update_entry(this._created_entry, true);
        put_scs_booking_entry(this._created_entry)
    }
    this.close();
    console.log(this.service_charges);
};

BookingEntryForm.prototype.reset = function reset() {
    for (let i = 0; i < this.inputs.length; i += 1) {
        let input = this.inputs[i];
        input.setAttribute('readonly', true);
    }

    for (let i = 0; i < this.buttons.length; i += 1) {
        let button = this.buttons[i];
        button.removeAttribute('disabled');
    }
}

BookingEntryForm.prototype.open_inputs =  function open_inputs() {
    for (let i = 0; i < this.inputs.length; i += 1) {
        let input = this.inputs[i];
        input.removeAttribute('readonly');
    }
}

BookingEntryForm.prototype.edit = function edit() {
    this.open_inputs();

    let delete_button = document.getElementById("booking_entry_form_del");
    delete_button.setAttribute('disabled', "true");

    let create_button = document.getElementById("booking_entry_form_create");
    create_button.setAttribute('disabled', "true");
}

BookingEntryForm.prototype.create = function create() {
    this.clear();
    this.open_inputs();
    // create ne entry without id
    //....
    let booking_entry = {
        '_amount' : 0,
        '_name': "",
        '_subject': "",
        '_date': "",
        '_booking_code': "",
        '_end_date': "",
        '_portion': 0,
        '_billable': false,
        '_id': "",
        '_scs_type': this.scs_type,
        '_cost_center': this.cost_center
    };

    this.fill_fields(booking_entry);
    this._is_created = true;
    this._created_entry = booking_entry;

};

BookingEntryForm.prototype.del = function del(){
    delete_scs_booking_entry(this.dom_object.booking_entry);
    this.close();
};

BookingEntryForm.prototype.cancel = function cancel(){
    this.close();
};

BookingEntryForm.prototype.show = function show(left, top, scs_type, dataset) {
    this.scs_type = scs_type;
    this.cost_center = dataset['costCenter']
    this._is_created = false;

    this.reset();

    let booking_entry = get_booking_entry(scs_type, dataset);

    this.dom_object.classList.remove('collapsed');
    this.dom_object.style.setProperty('top', top + 'px');
    this.dom_object.style.setProperty('left', left + 'px');
    this.dom_object.booking_entry = booking_entry

    this.fill_fields(booking_entry);

};


BookingEntryForm.prototype.fill_fields = function fill_fields(booking_entry) {
    document.getElementById("amount_field").value = booking_entry['_amount'];
    document.getElementById("name_field").value = booking_entry['_name'];
    document.getElementById("subject_field").value = booking_entry['_subject'];
    document.getElementById("date_field").value = booking_entry['_date'];
    document.getElementById("booking_code_field").value = booking_entry['_booking_code'];
    document.getElementById("end_date_field").value = booking_entry['_end_date'];
    document.getElementById("portion_field").value = booking_entry['_portion'];
    document.getElementById("billable_field").value = booking_entry['_billable'];
    document.getElementById("id_label").innerHTML = booking_entry['_id'].substr(0,30);
};