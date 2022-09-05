import { Router } from "express";
const router = Router();

import { userCreate, userLister, userListerId, userUpdate, userDelete  } from "../controlerss/controllersUser.mjs";

//insere um usuario
router.post("/usuarios", userCreate);

//lista os usuarios
router.get("/usuarios", userLister);

//Lista o usuario de acordo com o id
router.get("/usuarios/:id", userListerId);

//editar o usuario
router.put("/usuarios/:id", userUpdate);

//deletar
router.delete("/usuarios/:id", userDelete);

export { router }