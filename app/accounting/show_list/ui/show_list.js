window.accounting__show_list.show_account_name_list((account_name_list) => {
console.log("SHOW_LIST::show_account_name_list")
    let account_list_div = document.querySelector('.sideboard-entry.account-list');
    for (let entry of account_name_list) {
        let entry_div = document.createElement('div');
        entry_div.classList.add("sideboard-entry-list-entry", "clickable", "selectable");
        entry_div.innerHTML = entry;
        account_list_div.appendChild(entry_div);
    }
});
