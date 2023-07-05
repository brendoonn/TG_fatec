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

postData.post('/postdata/postcompraproduto', (req, res) => {
    const { fornecedorId, listaProdutos, meioPagamento, quantidadeTotal, troco, valorRecebido, valorTotal } = req.body;

    try {
        db.beginTransaction((err) => {
            if (err) {
                throw err;
            }
            let sqlCompra = "INSERT INTO tbl_compra (data_compra, valor_compra, data_available, FK_fornecedor) VALUES (?,?,?,?)";
            db.query(sqlCompra, [dataFormatada, valorTotal, true, fornecedorId], (err, compraResult) => {
                if (err) {
                    db.rollback(() => {
                        console.log(err);
                        res.status(500).send("Erro ao inserir os dados na tabela tbl_compra.");
                    });
                } else {
                    const compraId = compraResult.insertId; // Obtém o ID da compra inserida
                    let produtos = listaProdutos // Array de produtos a serem inseridos no tbm_estoque
                    // Função auxiliar para inserir cada produto na tabela tbm_estoque
                    const inserirProduto = (produto, index) => {
                        let sqlEstoque = "INSERT INTO tbl_estoque (FK_produto, FK_compra, quantidade_inicial, quantidade_atual, data_validade_lote, data_available) VALUES (?,?,?,?,?,?)";
                        db.query(sqlEstoque, [produto.ID_produto, compraId, produto.quantidade, produto.quantidade, dataFormatada, true], (err, estoqueResult) => {
                            if (err) {
                                db.rollback(() => {
                                    console.log(err);
                                    res.status(500).send("Erro ao inserir os dados na tabela tbm_estoque.");
                                });
                            } else {
                                if (index === produtos.length - 1) {
                                    db.commit((err) => {
                                        if (err) {
                                            db.rollback(() => {
                                                console.log(err);
                                                res.status(500).send("Erro ao realizar o commit da transação.");
                                            });
                                        } else {
                                            res.status(200).send("Dados inseridos com sucesso.");
                                        }
                                    });
                                }
                            }
                        });
                    };
                    produtos.forEach((produto, index) => {
                        inserirProduto(produto, index);
                    });
                }
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro ao executar a transação de banco de dados.");
    }
});

