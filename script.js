let saldo;
let objPengeluaran = [];

let titlePengeluaran;
let amountPengeluaran;
let categoryPengeluaran;

var expenses = 0;

let filter_type;
let Money = {
    saldo: 0,
    expenses: 0
};
let filteredObj = [];
let showAllObj = [];
let showMoney = [];

let updateTemp = [];
let titleUpdate;
let amountUpdate;
let categoryUpdate;

let index;

console.log(objPengeluaran);

const table = document.getElementById("table_pengeluaran");

const btn_masuk = document.getElementById("submit_pemasukan");
btn_masuk.addEventListener("click", uang_masuk);

const btn_pengeluaran = document.getElementById("submit_pengeluaran");
btn_pengeluaran.addEventListener("click", addPengeluaran);

const total_saldo = document.getElementById("total_saldo");
const pengeluaran = document.getElementById("total_pengeluaran");

const filter_btn = document.getElementById("filter_btn");
filter_btn.addEventListener("click", filter_table);

const show_all = document.getElementById("show_all");
show_all.addEventListener("click", showAll);

const clear_all = document.getElementById("clear_all");
clear_all.addEventListener("click", clearAll);

const submit_update = document.getElementById("submit_update");
submit_update.addEventListener("click", inputUpdate);

function showAll(){
    objPengeluaran = JSON.parse(localStorage.getItem('objPengeluaran'));
    Money = JSON.parse(localStorage.getItem('money'));

    table.innerHTML = ``;

    objPengeluaran.forEach(obj => 
        table.innerHTML += `
        <tr>
            <td>${obj.title}</td>
            <td>Rp.${obj.amount}.00</td>
            <td>${obj.category}</td>
            <td><a href="#update"><button class="btn" onclick="update(this)">✏️</button></a></td>
            <td><button class="btn" onclick="deleteItem(this)">❌</button></td>
        </tr>
    `
    );

    saldo = Money.saldo;
    total_saldo.textContent = `Total Saldo: Rp.${saldo}.00`;

    expenses = Money.expenses;
    pengeluaran.textContent = `Total Expenses: Rp.${expenses}.00`;
}

function clearAll(){
    localStorage.removeItem('objPengeluaran');
    location.reload();
    alert('Data berhasil dihapus');
}

function uang_masuk(){
    saldo = document.getElementById("input_uangMasuk").value;
    total_saldo.textContent = `Total Saldo: Rp.${saldo}.00`;
}

function addPengeluaran(){
    
    titlePengeluaran = document.getElementById("input_titlePengeluaran").value;
    amountPengeluaran = Number(document.getElementById("input_jumlahPengeluaran").value);
    categoryPengeluaran = document.getElementById("input_categoryPengeluaran").value;
    
    objPengeluaran.push({title: titlePengeluaran, amount: amountPengeluaran, category: categoryPengeluaran});

    table.innerHTML += `
        <tr>
            <td>${titlePengeluaran}</td>
            <td>Rp.${amountPengeluaran}.00</td>
            <td>${categoryPengeluaran}</td>
            <td><a href="#update"><button class="btn" onclick="update(this)">✏️</button></a></td>
            <td><button class="btn" onclick="deleteItem(this)">❌</button></td>
        </tr>
    `;

    expenses += amountPengeluaran;
    pengeluaran.textContent = `Total Expenses: Rp.${expenses}.00`;
    
    saldo -= amountPengeluaran;
    total_saldo.textContent = `Total Saldo: Rp.${saldo}.00`;

    Money.saldo = saldo;
    Money.expenses = expenses;

    localStorage.setItem('objPengeluaran', JSON.stringify(objPengeluaran));
    localStorage.setItem('money', JSON.stringify(Money));
    
}

function displayAll(){

    table.innerHTML = ``;

    objPengeluaran.forEach(obj => 
        table.innerHTML += `
        <tr>
            <td>${obj.title}</td>
            <td>Rp.${obj.amount}.00</td>
            <td>${obj.category}</td>
            <td><a href="#update"><button class="btn" onclick="update(this)">✏️</button></a></td>
            <td><button class="btn" onclick="deleteItem(this)">❌</button></td>
        </tr>
    `
    );

}

function filter_table(){
    filter_type = document.getElementById("filter_options").value;

    if(filter_type === "All"){
        displayAll();
        return;
    }

    filteredObj = objPengeluaran.filter(obj => obj.category === filter_type);

    table.innerHTML = ``;

    filteredObj.forEach(obj => 
        table.innerHTML += `
        <tr>
            <td>${obj.title}</td>
            <td>Rp.${obj.amount}.00</td>
            <td>${obj.category}</td>
            <td><a href="#update"><button class="btn" onclick="update(this)">✏️</button></a></td>
            <td><button class="btn" onclick="deleteItem(this)">❌</button></td>
        </tr>
    `
    );

}

function update(btn){
    index = $(btn).closest('tr').index();
    
    
    updateTemp = JSON.parse(localStorage.getItem('objPengeluaran'));
    const data = updateTemp[index];

    // console.log(data);

    document.getElementById("update_title").value = data.title;
    document.getElementById("update_amount").value = data.amount;
    document.getElementById("update_category").value = data.category;

}

function inputUpdate(){
    titleUpdate = document.getElementById("update_title").value;
    amountUpdate = document.getElementById("update_amount").value;
    categoryUpdate = document.getElementById("update_category").value;

    objPengeluaran[index] = {
        title: titleUpdate,
        amount: amountUpdate,
        category: categoryUpdate
    }

    localStorage.setItem('objPengeluaran', JSON.stringify(objPengeluaran));
    localStorage.setItem('money', JSON.stringify(Money));

    location.reload();
    alert("Data berhasil diupdate");
    
}

function deleteItem(btn){
    index = $(btn).closest('tr').index();

    // objPengeluaran = JSON.parse(localStorage.getItem('objPengeluaran'));

    objPengeluaran.splice(index, 1);
    localStorage.setItem('objPengeluaran', JSON.stringify(objPengeluaran));

    alert("Data berhasil dihapus");
    location.reload();

}