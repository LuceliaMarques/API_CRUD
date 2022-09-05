import { user } from "./User.mjs";
import { users, write } from "../dataBase/repository.js";


//Criar o user
async function userCreate(req, res) {

    const { name, email } = req.body;
    const userArr = users.userData;
    const createUser = new user(userArr.length, name, email);
    userArr.push(createUser);
    write(userArr);
    return res.status(200).json(createUser);

}

//Lista todos os usuarios (exceto os com delete = false)
async function userLister(req, res){
   
    const userAssistant = [];
    const userArr = users.userData;
    for(let i=0; i < userArr.length; i++){
        if(userArr[i].delete === false){
            userAssistant.push(userArr[i]);
        }
    }
    return res.status(200).json(Object.values(userAssistant));
}

//Lista o usuário indicado pelo id
async function userListerId(req, res){

    const userArr = users.userData;
    const index = Number(req.params.id);
    return res.json(userArr[index]);
}

//Deleta o usuario indicado pelo id
async function userDelete(req, res) {

    const userArr = users.userData;
    const index = Number(req.params.id);
    if(userArr.length >= index){
        if(userArr[index].id == req.params.id){
            userArr[index].delete = true;
            write(userArr);
            return res.status(200).json(userArr[index]);
        }
    }
    else{
        return res.status(400).json("Id inexistente!");
    }
    
}

//Edita o usuário indicado pelo id
async function userUpdate(req, res) {

    const userArr = users.userData;
    const index = Number(req.params.id);
    const { name, email } = req.body;
    
    if(userArr[index].id == req.params.id){
        
        userArr[index].name = name;
        userArr[index].email = email;
        write(userArr);
        return res.status(200).json(userArr[index]);
    }

}

export { userCreate, userLister, userListerId, userDelete, userUpdate }