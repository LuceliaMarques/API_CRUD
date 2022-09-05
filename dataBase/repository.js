import { readFile, writeFile } from 'node:fs/promises';

const userData = [];
const users = {
    userData,
}

//Ler o arquivo JSON
async function read(){

    users.userData = JSON.parse(await readFile("./dataBase/user.json"));

}

read();

function write(data){
    writeFile("./dataBase/user.json", JSON.stringify(data), erro => {
        if (erro){
            console.log("Erro ao escever no arquivo: ", erro);
        }
    });
}

export { users, write }