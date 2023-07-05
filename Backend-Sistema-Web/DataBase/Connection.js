const express = require('express')
const app = express()
const mysql = require("mysql");
const cors = require("cors");

function Repos(){
  const db = mysql.createPool({
    host: "seu servidor",
    user: "usuario com direitos",
    password: "senha do usuario",
    database: "nome do seu banco de dados",
  })
}

module.exports = Repos();