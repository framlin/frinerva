// @ts-ignore
window['accounting__create_account'].register_event_listener(() => {
    register_create_button();
    register_account_list_entry_selection();
    register_move_button();
});

// @ts-ignore
window['accounting__create_account'].account_creation_finished(() => {
    reset_list('#account-column');
    reset_list('#period-column');
    clear_list('#result-column');
});

// @ts-ignore
window['accounting__create_account'].show_error((error_message: string) => {
    alert(error_message);
});

// @ts-ignore
window['accounting__create_account'].show_new_accounts_list((new_accounts_list) => {
    let result_column = document.querySelector('#result-column') as HTMLDivElement;
    for (let new_account of new_accounts_list) {
        let new_entry = document.createElement('div');
        new_entry.innerHTML = `${new_account.booking_period} -${new_account.label}`
        new_entry.setAttribute('data-cost-center', new_account.cost_center);
        new_entry.setAttribute('data-booking-period', new_account.booking_period);
        new_entry.classList.add("account-entry", "clickable", "selectable");
        add_selection_listener(new_entry)
        result_column.appendChild(new_entry);
    }
});

// @ts-ignore
window['accounting__create_account'].show_booking_period_list((booking_period_list) => {
    clear_list('#period-column')
    let period_column = document.querySelector('#period-column') as HTMLDivElement;
    for (let booking_period of booking_period_list) {
        let account_entry = document.createElement('div');
        account_entry.setAttribute('data-booking-period', booking_period);
        account_entry.classList.add("account-entry", "clickable", "selectable");
        account_entry.innerHTML = booking_period
        add_selection_listener(account_entry)
        period_column.appendChild(account_entry);
    }
});


// @ts-ignore
window['accounting__create_account'].show_cost_center_list((cost_center_list) => {
    clear_list('#account-column')
    let account_list = document.querySelector('#account-column') as HTMLDivElement;
    for (let cost_center in cost_center_list) {
        if (cost_center !== 'NONE') {
            let account_entry = document.createElement('div');
            account_entry.setAttribute('data-cost-center', cost_center);
            account_entry.classList.add("account-entry", "clickable", "selectable");
            account_entry.innerHTML = cost_center_list[cost_center];
            add_selection_listener(account_entry)
            account_list.appendChild(account_entry);
        }
    }
});

function add_selection_listener(list_entry: HTMLDivElement) {
    list_entry.addEventListener('click', () => {
        list_entry.classList.toggle('selected');
    });
}

function reset_list(selector: string) {
    let list = document.querySelector(selector);
    // @ts-ignore
    for (let child of list.children) {
        child.classList.remove('selected');
    }
}

function clear_list(selector: string) {
    let list = document.querySelector(selector);
    // @ts-ignore
    for (let child of list.children) {
        if (!child.classList.contains('account-list-header')) {
            child.remove();
        }
    }
}

function register_create_button() {
    let create_button = document.querySelector('.next-btn' ) as HTMLButtonElement;
    create_button.addEventListener('click', () => {
        let new_accounts_list = get_new_accounts_list();
        // @ts-ignore
        window['accounting__create_account'].send_create(new_accounts_list);
    });
}

function get_new_accounts_list() {
    let new_accounts_list : any[]= [];
    let result_column_entries = document.querySelectorAll('#result-column .account-entry');
    result_column_entries.forEach((entry) => {
        new_accounts_list.push({
            // @ts-ignore
            booking_period: entry.dataset.bookingPeriod,
            // @ts-ignore
            cost_center: entry.dataset.costCenter,
        });
    });
    return new_accounts_list;
}

function register_account_list_entry_selection() {
    let list_entries = document.querySelectorAll('.selectable');
    list_entries.forEach((list_entry) => {
        // @ts-ignore
        add_selection_listener(list_entry);
    });
}

function register_move_button() {
    let move_entry_button = document.querySelector('#move-entry-btn') as HTMLButtonElement;
    move_entry_button.addEventListener('click', () => {
        let accounts :any[] = [];
        let periods :any[] = [];

        let account_selection = document.querySelectorAll('#account-column .selected');
        account_selection.forEach((list_entry) => {
            // @ts-ignore
            accounts.push({key: list_entry.dataset.costCenter, label: list_entry.innerHTML});
        })
        let period_selection = document.querySelectorAll('#period-column .selected');
        period_selection.forEach((list_entry) => {
            periods.push(list_entry.innerHTML);
        })
        // @ts-ignore
        window['accounting__create_account'].send_period_cost_center_selected({periods, accounts});
    });
}
