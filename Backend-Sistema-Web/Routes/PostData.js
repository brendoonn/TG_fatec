const express = require('express')
const postData = express.Router()
const mysql = require('mysql2')
const multerPessoa = require('../DataBase/MulterConfig')

const { realizaVenda } = require('../TreatData/Venda')
const MulterConfigSys = require('../DataBase/MulterConfigSys')

//const db = require(Connection.Repos);

const db = mysql.createPool({
    host: "seu servidor",
    user: "usuario com direitos",
    password: "senha do usuario",
    database: "nome do seu banco de dados",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, '0');
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const ano = String(dataAtual.getFullYear());
const dataFormatada = `${ano}-${mes}-${dia}`;


function convertDateToAmericanFormat(date) {
    // Divide a data em dia, mês e ano
    const parts = date.split('-');
    // Reorganiza os valores no formato americano (ano-mês-dia)
    const americanFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return americanFormat;
}


postData.post('/postdata/postcargo', (req, res) => {
    const { ID_cargo, cargo, data_available } = req.body;
    if (db._closed) {
        db = mysql.createPool(config);
    }
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        let sql = "INSERT INTO tbl_cargo (ID_cargo, cargo, data_available) VALUES (?,?,?)";
        connection.query(sql, [ID_cargo, cargo, data_available], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao inserir os dados do cargo');
            } else {
                res.send(result);
            }
            connection.release();
        });
    });
});




postData.post('/postdata/postcategoria', (req, res) => {
    const { categoria, desc_categoria } = req.body;
    if (db._closed) {
        db = mysql.createPool(config);
    }
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        let sql = "INSERT INTO tbl_categoria (categoria, desc_categoria, data_available) VALUES (?,?,?)";
        connection.query(sql, [categoria, desc_categoria, true], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao inserir os dados da categoria');
            } else {
                res.send(result);
            }
            connection.release();
        });
    });
});


postData.post('/postdata/postmarca', (req, res) => {
    const { nome_marca, nacionalidade } = req.body;
    if (db._closed) {
        db = mysql.createPool(config);
    }
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        let sql = "INSERT INTO tbl_marca (nome_marca, nacionalidade, data_available) VALUES (?,?,?)";
        connection.query(sql, [nome_marca, nacionalidade, true], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao inserir os dados da marca');
            } else {
                res.send(result);
            }
            connection.release();
        });
    });
});


postData.post('/postdata/postproduto', (req, res) => {
    const { ID_produto, nome, valor_uni, min_recomendado, peso, descricao, FK_categoria, FK_marca, data_available } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        let sql = "INSERT INTO tbl_produto (ID_produto, nome, valor_uni, min_recomendado , peso, descricao, FK_categoria, FK_marca, data_available) VALUES (?,?,?,?,?,?,?,?,?)";
        connection.query(sql, [ID_produto, nome, valor_uni, min_recomendado, peso, descricao, FK_categoria, FK_marca, true], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao inserir os dados do produto');
            } else {
                res.send(result);
            }
        });
    });
});



postData.post('/postdata/postproduto', (req, res) => {
    const { FK_pessoa, FK_funcionario, FK_forma_pagamento, data_venda, valor_liquido, valor_bruto, desconto, descricao } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        let sql = `INSERT INTO tbl_venda ( FK_pessoa, FK_funcionario, FK_forma_pagamento, data_venda, valor_liquido, valor_bruto, desconto, descricao, data_available) VALUES (?,?,?,?,?,?,?,?,?)`
        connection.query(sql, [FK_pessoa, FK_funcionario, FK_forma_pagamento, data_venda, valor_liquido, valor_bruto, desconto, descricao, true], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao inserir os dados da venda');
            } else {
                res.send(result);
            }
        });
    });
});

postData.post('/postdata/postempresa', MulterConfigSys.array('image', 3), (req, res) => {
    const {
        emp_cnpj, emp_ie, emp_im, emp_nome, emp_nome_fantasia, emp_data, emp_logradouro, emp_numero, emp_complemento,
        emp_cep, emp_bairro, emp_municipio, emp_uf, emp_telefone, emp_imagem, emp_logomarca_claro,
        emp_logomarca_escuro } = JSON.parse(req.body.novEmpresa)

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }

        const imagemEscura = req.files[0].filename;
        const imagemClara = req.files[1].filename;
        const imagemDesktop = req.files[2].filename;

        const data_abertura = convertDateToAmericanFormat(emp_data)


        //var dataConvertida = convertDateToAmericanFormat(data_abertura)
        let sql = `INSERT INTO tbl_empresa ( emp_cnpj, emp_ie, emp_im, emp_nome, emp_nome_fantasia, emp_data, emp_logradouro, emp_numero, emp_complemento,emp_cep, emp_bairro,emp_municipio, emp_uf,emp_telefone,emp_imagem, emp_logomarca_claro, emp_logomarca_escuro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        connection.query(sql, [emp_cnpj, emp_ie, emp_im, emp_nome, emp_nome_fantasia, data_abertura, emp_logradouro, emp_numero, emp_complemento,
            emp_cep, emp_bairro, emp_municipio, emp_uf, emp_telefone, imagemDesktop, imagemClara, imagemEscura], (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).send('Erro ao inserir os dados da venda');
                } else {
                    console.log("resultado: " + result);
                    res.send(result);
                }
            });
    });
});



postData.post('/postdata/postvenda', (req, res) => {
    console.log("entrou na requisição")
    console.log(req.body)
    const { clienteId, funcionarioId, meioPagamento, valor_liquido, valor_bruto, valorTotal, desconto, descricao } = req.body;
    var idVenda = 0;
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao iniciar a transação');
                connection.release();
                return;
            }
            const sql = 'INSERT INTO tbl_venda (FK_pessoa, FK_funcionario, FK_forma_pagamento, data_venda, valor_liquido, valor_bruto, desconto, descricao, data_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, [clienteId, funcionarioId, meioPagamento, dataFormatada, valorTotal, valorTotal, 0, descricao, 1], (err, result) => {
                if (err) {
                    console.log(err);
                    connection.rollback(() => {
                        console.log('Erro ao inserir os dados da venda. Rollback executado.');
                        connection.release();
                        res.status(500).send('Erro ao inserir os dados da venda');
                    });
                } else {
                    const idVenda = result.insertId; // Obtém o ID do insert realizado
                    console.log('Venda inserida com sucesso. ID da venda: ' + idVenda);
                    //
                    try {
                        const produtos = req.body.listaProdutos; // Certifique-se de que os produtos estejam presentes na requisição
                        produtos.forEach(produtos => {
                            var resultado = realizaVenda(produtos.quantidade, produtos.ID_produto, idVenda, produtos.valor_uni);
                            if (resultado === 200) {
                                "finalizou"
                            }
                            else {

                            }
                        });
                        connection.commit((err) => {
                            if (err) {
                                console.log(err);
                                connection.rollback(() => {
                                    console.log('Erro ao realizar commit. Rollback executado.');
                                    connection.release();
                                    res.status(500).send('Erro ao finalizar a venda');
                                });
                            } else {
                                console.log('Venda concluída com sucesso');
                                connection.release();
                                res.status(200).send('Venda concluída com sucesso');
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        connection.rollback(() => {
                            console.log('Erro ao realizar a venda. Rollback executado.');
                            connection.release();
                            res.status(500).send('Erro ao realizar a venda');
                        });
                    }
                }
            });
        });
    });
});

postData.post('/postdata/postbaixa', (req, res) => {
    console.log("entrou na requisição pra baixa")
    const { funcionarioId, justificativa } = req.body;
    var idVenda = 0;
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao iniciar a transação');
                connection.release();
                return;
            }
            const sql = 'INSERT INTO tbl_venda (FK_pessoa, FK_funcionario, FK_forma_pagamento, data_venda, valor_liquido, valor_bruto, desconto, descricao, data_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, [null, funcionarioId, null, dataFormatada, 0, 0, 0, justificativa, 1], (err, result) => {
                if (err) {
                    console.log(err);
                    connection.rollback(() => {
                        console.log('Erro ao inserir os dados da baixa. Rollback executado.');
                        connection.release();
                        res.status(500).send('Erro ao inserir os dados da venda');
                    });
                } else {
                    const idVenda = result.insertId; // Obtém o ID do insert realizado
                    console.log('Baixa dada com sucesso. ID da baixa: ' + idVenda);
                    try {
                        const produtos = req.body.listaProdutos; // Certifique-se de que os produtos estejam presentes na requisição
                        produtos.forEach(produtos => {
                            var resultado = realizaVenda(produtos.quantidade, produtos.ID_produto, idVenda, produtos.valor_uni);
                            if (resultado === 200) {
                                res.status(200).send('Baixa concluída com sucesso');
                            }
                            else {

                            }
                        });
                        connection.commit((err) => {
                            if (err) {
                                console.log(err);
                                connection.rollback(() => {
                                    console.log('Erro ao realizar commit. Rollback executado.');
                                    connection.release();
                                    res.status(500).send('Erro ao finalizar a venda');
                                });
                            } else {
                                console.log('Baixa concluída com sucesso');
                                connection.release();
                                res.status(200).send('Baixa concluída com sucesso');
                            }
                        });
                    } catch (error) {
                        console.log(error);
                        connection.rollback(() => {
                            console.log('Erro ao realizar a venda. Rollback executado.');
                            connection.release();
                            res.status(500).send('Erro ao realizar a venda');
                        });
                    }
                }
            });
        });
    });
});



postData.post('/postdata/postnovoproduto', (req, res) => {
    const { ID_produto } = req.body;
    const { nome } = req.body;
    const { valor_uni } = req.body;
    const { data_validade_lote } = req.body;
    const { peso } = req.body;
    const { descricao } = req.body;
    const { min_recomendado } = req.body;
    const { FK_categoria } = req.body;
    const { FK_marca } = req.body;
    const { data_available } = req.body;

    let sql = "INSERT INTO tbl_produto (ID_produto, nome, valor_uni, data_validade_lote, peso, descricao, min_recomendado=?, FK_categoria,FK_marca, data_available) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sql, [ID_produto, nome, valor_uni, data_validade_lote, peso, descricao, min_recomendado, FK_categoria, FK_marca, data_available], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
    db.end()
})


postData.post('/postdata/postvendaproduto', (req, res) => {
    console.log(req.body)
    const { FK_venda, FK_estoque, quantida, valor_uni, data_available } = req.body;
    let sql = "INSERT INTO tbl_venda_produto (FK_venda, FK_estoque, quantidade, valor_venda_uni, data_available) VALUES (?,?,?,?,?)";
    db.query(sql, [FK_venda, FK_estoque, quantida, valor_uni, data_available], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao inserir os dados do produto da venda');
        } else {
            res.send(result);
        }
    });
});






postData.post('/postdata/postcompraproduto', (req, res) => {
    const { fornecedorId, listaProdutos, meioPagamento, quantidadeTotal, troco, valorRecebido, valorTotal } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        try {
            connection.beginTransaction((err) => {
                if (err) {
                    throw err;
                }
                let sqlCompra = "INSERT INTO tbl_compra (data_compra, valor_compra, data_available, FK_fornecedor) VALUES (?,?,?,?)";
                connection.query(sqlCompra, [dataFormatada, valorTotal, true, fornecedorId], (err, compraResult) => {
                    if (err) {
                        connection.rollback(() => {
                            console.log(err);
                            res.status(500).send("Erro ao inserir os dados na tabela tbl_compra.");
                        });
                    } else {
                        const compraId = compraResult.insertId; // Obtém o ID da compra inserida
                        let produtos = listaProdutos // Array de produtos a serem inseridos no tbm_estoque
                        // Função auxiliar para inserir cada produto na tabela tbm_estoque
                        const inserirProduto = (produto, index) => {
                            let sqlEstoque = "INSERT INTO tbl_estoque (FK_produto, valor_uni_compra, FK_compra, quantidade_inicial, quantidade_atual, data_validade_lote, data_available) VALUES (?,?,?,?,?,?,?)";
                            connection.query(sqlEstoque, [produto.ID_produto, produto.valor_uni, compraId, produto.quantidade, produto.quantidade, dataFormatada, true], (err, estoqueResult) => {
                                if (err) {
                                    connection.rollback(() => {
                                        console.log(err);
                                        res.status(500).send("Erro ao inserir os dados na tabela tbm_estoque.");
                                    });
                                } else {
                                    if (index === produtos.length - 1) {
                                        connection.commit((err) => {
                                            if (err) {
                                                connection.rollback(() => {
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
        } finally {
            connection.release();
        }
    });
});



postData.post('/postdata/postimage/usuario', multerPessoa.single('image'), (req, res) => {
    const local = req.body.local || '../ImageSys/';
    console.log('Local:', local);
    console.log('Arquivo:', req.file);
    res.send('Upload realizado com sucesso!');
    db.end()
});


postData.post('/postdata/postcadfuncionario', multerPessoa.single('image'), (req, res) => {
    const { nome, sobrenome, cpf, celular, email, data_nascimento, FK_cargo, login, senha,
        nivelDeAcesso, cidade, bairro, rua, uf, numero, referencia, cep } = JSON.parse(req.body.novfuncionario)

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao iniciar a transação');
                connection.release();
                return;
            }
            console.log(req.body)
            console.log(req.file)
            //const localImage = req.body.local || '../ImageSys/';
            //console.log('Local:', localImage);

            var imagem = null; // Obtém o nome do arquivo carregado
            if (req.file) {
                imagem = req.file.filename ? req.file.filename : null;
            }

            let sqlPessoa = "INSERT INTO tbl_pessoa (nome, sobrenome, cpf, celular, email, data_nascimento, img_perfil, data_available) VALUES (?,?,?,?,?,?,?,?)";
            connection.query(sqlPessoa, [nome, sobrenome, cpf, celular, email, data_nascimento, imagem, true], (err, pessoaResult) => {
                if (err) {
                    console.log(err);
                    connection.rollback(() => {
                        res.status(500).send('Erro ao inserir os dados da pessoa');
                        connection.release();
                    });
                    return;
                }
                const FK_pessoa = pessoaResult.insertId;
                let sqlFuncionario = "INSERT INTO tbl_funcionario (FK_pessoa, FK_cargo, data_adminissao, status_conta, data_available, senha, login, nivel_acesso, configuracoes) VALUES (?,?,?,?,?,?,?,?,?)";
                connection.query(sqlFuncionario, [FK_pessoa, FK_cargo, dataFormatada, true, true, senha, login, nivelDeAcesso, ""], (err, funcionarioResult) => {
                    if (err) {
                        console.log(err);
                        connection.rollback(() => {
                            res.status(500).send('Erro ao inserir os dados do funcionário');
                            connection.release();
                        });
                        return;
                    }
                    let sqlEndereco = "INSERT INTO tbl_endereco (cidade, bairro, rua, uf, numero, referencia, cep, data_available, FK_pessoa) VALUES (?,?,?,?,?,?,?,?,?)";
                    connection.query(sqlEndereco, [cidade, bairro, rua, uf, numero, referencia, cep, true, FK_pessoa], (err, enderecoResult) => {
                        if (err) {
                            console.log(err);
                            connection.rollback(() => {
                                res.status(500).send('Erro ao inserir os dados do endereço');
                                connection.release();
                            });
                            return;
                        }
                        connection.commit((err) => {
                            if (err) {
                                console.log(err);
                                connection.rollback(() => {
                                    res.status(500).send('Erro ao realizar commit da transação');
                                    connection.release();
                                });
                            } else {
                                res.send(enderecoResult);
                                connection.release();
                            }
                        });
                    });
                });
            });
        });
    });
});



postData.post('/postdata/postcadcliente', (req, res) => {
    const { nome, sobrenome, cpf, celular, email, data_nascimento, cidade, bairro, rua, uf, numero, referencia, cep } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao iniciar a transação');
                connection.release();
                return;
            }
            let sqlPessoa = "INSERT INTO tbl_pessoa (nome, sobrenome, cpf, celular, email, data_nascimento, data_available) VALUES (?,?,?,?,?,?,?)";
            connection.query(sqlPessoa, [nome, sobrenome, cpf, celular, email, data_nascimento, true], (err, pessoaResult) => {
                if (err) {
                    console.log(err);
                    connection.rollback(() => {
                        res.status(500).send('Erro ao inserir os dados da pessoa');
                        connection.release();
                    });
                    return;
                }
                const FK_pessoa = pessoaResult.insertId;
                let sqlEndereco = "INSERT INTO tbl_endereco (cidade, bairro, rua, uf, numero, referencia, cep, data_available, FK_pessoa) VALUES (?,?,?,?,?,?,?,?,?)";
                connection.query(sqlEndereco, [cidade, bairro, rua, uf, numero, referencia, cep, true, FK_pessoa], (err, enderecoResult) => {
                    if (err) {
                        console.log(err);
                        connection.rollback(() => {
                            res.status(500).send('Erro ao inserir os dados do endereço');
                            connection.release();
                        });
                        return;
                    }
                    connection.commit((err) => {
                        if (err) {
                            console.log(err);
                            connection.rollback(() => {
                                res.status(500).send('Erro ao realizar commit da transação');
                                connection.release();
                            });
                        } else {
                            res.send(enderecoResult);
                            connection.release();
                        }
                    });
                });
            });
        });
    });
});



postData.post('/postdata/postcadfornecedor', (req, res) => {
    const { cnpj, email, razao_social, telefone, cidade, bairro, rua, uf, numero, referencia, cep } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        connection.beginTransaction((err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro ao iniciar a transação');
                connection.release();
                return;
            }
            let sqlPessoa = "INSERT INTO tbl_fornecedor(cnpj, email, razao_social, telefone, data_available) VALUES (?,?,?,?,?)";
            connection.query(sqlPessoa, [cnpj, email, razao_social, telefone, true], (err, fornecedorResult) => {
                if (err) {
                    console.log(err);
                    connection.rollback(() => {
                        res.status(500).send('Erro ao inserir os dados do fornecedor');
                        connection.release();
                    });
                    return;
                }
                const FK_fornecedor = fornecedorResult.insertId;
                let sqlEndereco = "INSERT INTO tbl_endereco (cidade, bairro, rua, uf, numero, referencia, cep, data_available, FK_fornecedor) VALUES (?,?,?,?,?,?,?,?,?)";
                connection.query(sqlEndereco, [cidade, bairro, rua, uf, numero, referencia, cep, true, FK_fornecedor], (err, enderecoResult) => {
                    if (err) {
                        console.log(err);
                        connection.rollback(() => {
                            res.status(500).send('Erro ao inserir os dados do endereço');
                            connection.release();
                        });
                        return;
                    }
                    connection.commit((err) => {
                        if (err) {
                            console.log(err);
                            connection.rollback(() => {
                                res.status(500).send('Erro ao realizar commit da transação');
                                connection.release();
                            });
                        } else {
                            res.send(enderecoResult);
                            connection.release();
                        }
                    });
                });
            });
        });
    });
});



module.exports = postData;