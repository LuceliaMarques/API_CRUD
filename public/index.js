const nome = document.getElementById("name");
const email = document.getElementById("email");
const id = document.getElementById("id");
const btn = document.getElementById("btn");
const tbody = document.getElementById("tbody");
const PORT = 8082;

btn.addEventListener("click", create);

function create(){
    console.log("criar");

    let _dados = {
        name: nome.value,
        email: email.value
    };

    console.log(_dados);

    fetch(`http://localhost:${PORT}/usuarios`, {
        method: "POST",
        body: JSON.stringify(_dados),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    .then((res) => res.json())
    .then((dados) => {
        console.log(dados);
    })
    .then(list())
    .catch((erro) => console.log(erro));

}

async function list(){
    console.log("listar");

    const dados = await fetch(`http://localhost:${PORT}/usuarios`, {
        method: "GET",
        headers: { "Content-type": "application/json" }
    });
    const dadosJson = await dados.json();

    tbody.innerHTML = "";
    
    if(dadosJson.length === 0){
        tbody.innerHTML = `<tr>Lista Vazia</tr>`;
    }
  
    let cor = "verde";

    for(let i=0; i<dadosJson.length; i++){

        tbody.innerHTML += `<tr class="${cor}">
        <th>`+ dadosJson[i].id +`</th>
        <th>`+ dadosJson[i].name +`</th>
        <th>`+ dadosJson[i].email +`</th>
        <th><span id="`+ dadosJson[i].id +`" class="material-icons" onclick="editOne(id)" >edit</span></th>
        <th><p id="`+ dadosJson[i].id +`"class="material-icons" onclick="del(id)" >delete</p></th>
        </tr>`

        if(cor === "verde"){
            cor = "cinza";
        }else{
            cor = "verde";
        }

    }

}

let index = null;
async function editOne(_id){

    console.log("editar", _id);
    btn.removeEventListener("click", create);
    index = _id;

    const dados = await fetch(`http://localhost:${PORT}/usuarios/${_id}`, {
        method: "GET",
        headers: { "Content-type": "application/json" }
    })
    
    const dadosJson = await dados.json();

    nome.value = dadosJson.name;
    email.value = dadosJson.email;
    
    btn.textContent = "EDITAR";
    btn.addEventListener("click", editTwo);
}

async function editTwo(){

    let _dados = {
        name: nome.value,
        email: email.value
    };

    fetch(`http://localhost:${PORT}/usuarios/${index}`, {
        method: "PUT",
        body: JSON.stringify(_dados),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    .then((res) => res.json())
    .then((dados) => {
        console.log(dados);
        btn.textContent = "CADASTRAR";
        btn.removeEventListener("click", editTwo);
        btn.addEventListener("click", create);
        nome.value = "";
        email.value = "";
    
    })
    .then(list())
    .catch((erro) => console.log(erro));

}

async function del(_id){
    console.log("deletar", _id);

    fetch(`http://localhost:${PORT}/usuarios/${_id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
    })
    .then((res) => res.json())
    .then((dados) => {
        console.log(dados);    
    })
    .then(list())
    .catch((erro) => console.log(erro));

}

window.addEventListener("load", list());