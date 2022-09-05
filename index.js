import express from "express";
import { router } from "./routes/routes.mjs";

const PORT = 8082;
let app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("./public"));

app.use(router);

app.listen(PORT, function(){console.log("Servidor Rodando na porta " + PORT + "!");});