const express = require('express')
const postData = express.Router()
const mysql = require('mysql')


    const db = mysql.createPool({
        host: "sigfatec.crmkw2b7hwrh.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "SigFatec2022",
        database: "sigpapelaria",
    })

    
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = String(dataAtual.getFullYear());
    const dataFormatada = `${dia}/${mes}/${ano}`;


postData.post('/postdata/postcadfuncionario', (req, res)=>{
    const {nome} = req.body;
    const {sobrenome} = req.body;
    const {cpf} = req.body;
    const {celular} = req.body;
    const {email} = req.body;
    const {data_nascimento} = req.body;
    const {cargo} = req.body;
    const {login} = req.body;
    const {senha} = req.body;
    const {nivelDeAcesso} = req.body;
    const {imagem} = req.body;
    const {cidade} = req.body;
    const {bairro} = req.body;
    const {rua} = req.body;
    const {uf} = req.body;
    const {numero} = req.body;
    const {referencia} = req.body;
    const {cep} = req.body;

    try{
        db.beginTransaction((err) => {
            if (err) {
              throw err;
            }
        let sqlPessoa = 
        "INSERT INTO tbl_pessoa (nome, sobrenome, cpf, celular, email, data_nascimento, imagem, data_available) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sqlPessoa,[nome, sobrenome, cpf, celular, email, data_nascimento, imagem, true], (err, pessoaResult) =>{
        if (err){
            db.rollback(() => {
              console.log(err);
            });
          } else {
            const FK_pessoa = pessoaResult.insertId;
            let sqlFuncionario = 
            "INSERT INTO tbl_funcionario (FK_pessoa, FK_cargo, data_adminissao, status_conta, data_available, senha, login, nivel_acesso, configuracoes) VALUES (?,?,?,?,?,?,?,?,?)" +
            db.query(sqlFuncionario,[FK_pessoa, cargo, dataFormatada, true, true, senha, login, nivelDeAcesso, ""], (err, funcionarioResult) =>{     
            if (err){
                db.rollback(() => {
                  console.log(err);
                });
              } else{
                let sqlEndereco = 
                "INSERT INTO tbl_endereco (cidade, bairro, rua, uf, numero, referencia, cep, data_available, FK_pessoa) VALUES (?,?,?,?,?,?,?,?)";
                db.query(sqlEndereco,[cidade, bairro, rua, uf, numero, referencia, cep, true, FK_pessoa], (err, enderecoResult) =>{
                    if (err){
                        db.rollback(() => {
                          console.log(err);
                        });
                      }else {
                        db.commit((err) => {
                          if (err) {
                            db.rollback(() => {
                              console.log(err);
                            });
                          } else {
                            res.send(enderecoResult);
                          }
                    })
                }})
            }})
        }})
    })
}
    catch(err) {
        console.log(err);
      }


    
})
