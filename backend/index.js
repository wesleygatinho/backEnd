const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors'); // Importação do CORS

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "wesleygatinho",
    database: "banco",
});

app.use(express.json());
app.use(cors()); // Uso do CORS

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send(err);
        } else if (result.length == 0) { 
            db.query("INSERT INTO usuarios (email, password) values (?, ?)", [email, password], (err, response) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ msg: "Cadastrado com sucesso" });
                }
            });
        } else {
            res.send({ msg: "Usuário já cadastrado" });
        }
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], (err, result) =>{
        if(err){
            req.send(err);
        }
        if(result.length > 0){
            res.send({msg: "Usuário logado com sucesso"});
        }else{
            res.send({msg: "Conta não encontrada"})
        }
    })
})


app.listen(3001, () => {
    console.log('Rodando na porta 3001');
});
