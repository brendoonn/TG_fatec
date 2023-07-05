const express = require('express')
const app = express()
const cors = require('cors')

const getData = require('../Routes/GetData')
const postData = require('../Routes/PostData')
const putData = require('../Routes/PutData')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/', getData)
app.use('/', postData)
app.use('/', putData)

app.listen(3001, () =>{
    console.log("rodando na port 3001");
}); 