let data = [
    { ID: 1, gender: "female", age: 21, name: "nada", email: "nadakhater97@gmail.com" },
    { ID: 2, gender: "female", age: 21, name: "mona", email: "mona@gmail.com" }
]


function readAll() {
    var tbdata = document.querySelector(".table_data");
    var elements = "";
    data.map(d => (
        elements += `<tr>
        <td>${d.name}</td>
        <td>${d.age}</td>
        <td>${d.ID}</td>
        <td>${d.gender}</td>
        <td>${d.email}</td>
        <td>
        <button onclick={edit(${d.ID})}>Update</button>
        <button onclick={delet(${d.ID})}>Delete</button>
        </td>

        
        </tr>`
    ))
    tbdata.innerHTML = elements;
}

function createForm() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".addbtn").style.display = "none";
}

function add() {
    var name = document.querySelector(".name").value;
    var age = document.querySelector(".age").value;
    var gender = document.querySelector(".gender").value;
    var email = document.querySelector(".email").value;
    var newObj = { ID: 3, name, age, gender, email };
    data.push(newObj);
    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".addbtn").style.display = "block";
    readAll();
}
function edit(id) {
    document.querySelector(".update_form").style.display = "block";
    document.querySelector(".addbtn").style.display = "none";
    var updateObj = data.find(f => f.ID === id);
    document.querySelector(".update_id").value = updateObj.ID;
    document.querySelector('.uname').value = updateObj.name;
    document.querySelector('.uid').value = updateObj.ID;
    document.querySelector('.uage').value = updateObj.age;
    document.querySelector('.ugender').value = updateObj.gender;
    document.querySelector('.uemail').value = updateObj.email;
}

function update() {
    var id = parseInt(document.querySelector(".update_id").value);
    var name = document.querySelector('.uname').value;
    var id = document.querySelector('.uid').value;
    var age = document.querySelector('.uage').value;
    var gender = document.querySelector('.ugender').value;
    var email = document.querySelector('.uemail').value;
    var updateObj = { id, age, name, gender, email };
    var index = data.findIndex(f => f.ID === id);
    data[index] = updateObj;
    document.querySelector(".update_form").style.display = "none";
    document.querySelector(".addbtn").style.display = "block";
    readAll();
}
function delet(id) {
    var newdata = data.filter(f => f.ID !== id);
    data = newdata;
    readAll();
}