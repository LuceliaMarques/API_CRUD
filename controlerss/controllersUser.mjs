import { user } from "./User.mjs";
import { users, write } from "../dataBase/repository.js";


async function userCreate(req, res) {

    const { name, email } = req.body;
    const userArr = users.userData;
    const createUser = new user(userArr.length, name, email);
    userArr.push(createUser);
    write(userArr);
    return res.status(200).json(createUser);

}

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

async function userListerId(req, res){

    const userArr = users.userData;
    const index = Number(req.params.id);
    return res.json(userArr[index]);
}

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