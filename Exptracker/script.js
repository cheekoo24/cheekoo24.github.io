// Expense Model
class Expense {
    constructor(type, item, date, amount) {
        this.type = type;
        this.item = item;
        this.date = date;
        this.amount = amount;
    }
}

var count = -1;

function addRow() {
    var type = document.getElementById("type");
    var item = document.getElementById("name");
    var date = document.getElementById("date");
    var amount = document.getElementById("amount");

    if (type.value == '' || item.value == '' || date.value == '' || amount.value == '') {
        alert("Please make sure you no field is empty");
        return;
    }

    // adding data to the table from the input
    var table = document.getElementById("table-data");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = type.value;
    cell2.innerHTML = item.value;
    cell3.innerHTML = date.value;
    cell4.innerHTML = amount.valueAsNumber;
    cell5.innerHTML = '<td><i id="x" class="fa fa-close" onclick="deleteRow(this)"></i></td>';
    
    // set the value to null after pressing the button
    type.value = null;
    item.value = null;
    date.value = null;
    amount.value = null;
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
