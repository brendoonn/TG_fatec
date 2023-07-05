const express = require('express')
const putData = express.Router()
const mysql = require('mysql')
const Repos = require('../DataBase/Connection');
const MulterConfig = require('../DataBase/MulterConfig');
const MulterConfigSys = require('../DataBase/MulterConfigSys');
//const db = require(Connection.Repos);
const url = '/putdata/put'
const db = mysql.createPool({
    host: "seu servidor",
    user: "usuario com direitos",
    password: "senha do usuario",
    database: "nome do seu banco de dados",
})


function convertDateToAmericanFormat(date) {
    // Divide a data em dia, mês e ano
    const parts = date.split('/');
    // Reorganiza os valores no formato americano (ano-mês-dia)
    const americanFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return americanFormat;
}

const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, '0');
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const ano = String(dataAtual.getFullYear());
const dataFormatada = `${ano}-${mes}-${dia}`;

putData.put(`${url}cargo`, (req, res) => {
    const { ID_cargo } = req.body;
    const { cargo } = req.body;
    const { data_available } = req.body;
    let sql =
        "INSERT INTO tbl_cargo SET cargo=?, data_available=? WHERE ID_cargo=?";
    db.query(sql, [cargo, data_available, ID_cargo], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}categoria`, (req, res) => {
    console.log(req.body)
    const { id } = req.body;
    const { categoria } = req.body;
    const { desc_categoria } = req.body;
    let sql =
        "UPDATE tbl_categoria SET categoria=?, desc_categoria=? WHERE ID_categoria=?;";
    db.query(sql, [categoria, desc_categoria, id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}fornecedor`, (req, res) => {
    console.log(req.body)
    const { ID_fornecedor } = req.body;
    const { cnpj } = req.body;
    const { razao_social } = req.body;
    const { email } = req.body;
    const { telefone } = req.body;
    let sql =
        "UPDATE tbl_fornecedor SET cnpj=?, razao_social=? , email=?, telefone=? WHERE ID_fornecedor=?";
    db.query(sql, [cnpj, razao_social, email, telefone, ID_fornecedor], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}compra`, (req, res) => {
    const { ID_compra } = req.body;
    const { data_compra } = req.body;
    const { quantidade_inicial } = req.body;
    const { valor_compra } = req.body;
    const { data_available } = req.body;
    const { FK_fornecedor } = req.body;
    let sql =
        "UPDATE tbl_compra SET data_compra=?, quantidade_inicial=?, valor_compra=?, data_available=?, FK_fornecedor=? WHERE ID_compra=?";
    db.query(sql, [data_compra, quantidade_inicial, valor_compra, data_available, FK_fornecedor, ID_compra], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}endereco`, (req, res) => {
    const { ID_endereco } = req.body;
    const { cidade } = req.body;
    const { bairro } = req.body;
    const { rua } = req.body;
    const { numero } = req.body;
    const { referencia } = req.body;
    const { cep } = req.body;
    const { data_available } = req.body;
    let sql =
        "UPDATE tbl_endereco SET cidade=?, bairro=?, rua=?, numero=?, referencia=?, cep=?, data_available=? WHERE ID_endereco=?";
    db.query(sql, [cidade, bairro, rua, numero, referencia, cep, data_available, ID_endereco], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}marca`, (req, res) => {
    const { id } = req.body;
    const { nome_marca } = req.body;
    const { nacionalidade } = req.body;
    let sql =
        "UPDATE tbl_marca SET nome_marca=?, nacionalidade = ? WHERE ID_marca= ?";
    db.query(sql, [nome_marca, nacionalidade, id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}produto`, (req, res) => {
    const { ID_produto } = req.body;
    const { nome } = req.body;
    const { valor_uni } = req.body;
    const { peso } = req.body;
    const { descricao } = req.body;
    const { FK_categoria } = req.body;
    const { FK_marca } = req.body;
    const { min_recomendado } = req.body;
    let sql =
        "UPDATE tbl_produto SET nome=?, valor_uni=?, peso=?, descricao=?, min_recomendado=?, FK_categoria=?,FK_marca=?, data_available=? WHERE ID_produto=?";
    db.query(sql, [nome, valor_uni, peso, descricao, min_recomendado, FK_categoria, FK_marca, true, ID_produto], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
            console.log(valor_uni)
            console.log(result)
        }
    })
})

putData.put(`${url}estoque`, (req, res) => {
    const { ID_estoque } = req.body;
    const { FK_produto } = req.body;
    const { FK_compra } = req.body;
    const { quantidade_atual } = req.body;
    const { validade } = req.body;
    const { data_available } = req.body;
    let sql =
        "UPDATE tbl_estoque SET FK_produto=?, FK_compra=?, quantidade_atual=?, validade=?, data_available=? WHERE ID_estoque=?";
    db.query(sql, [FK_produto, FK_compra, quantidade_atual, validade, data_available, ID_estoque], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


putData.put(`${url}editcliente`, (req, res) => {
    console.log(req.body)
    const { ID_pessoa } = req.body;
    const { nome } = req.body;
    const { sobrenome } = req.body;
    const { cpf } = req.body;
    const { data_nascimento } = req.body;
    const { celular } = req.body;
    const { email } = req.body;
    const { data_available } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }
        let sql = "UPDATE tbl_pessoa SET nome=?, sobrenome=?, cpf=?,data_nascimento=? , celular=?, email=? , data_available=?, img_perfil =? WHERE ID_pessoa=?";
        connection.query(sql, [nome, sobrenome, cpf, data_nascimento, celular, email, data_available, null, ID_pessoa], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                console.log(err);
                res.status(500).send('Erro ao inserir os dados do produto');
            } else {
                res.send(result);
            }
        });
    });
});



/* 
putData.put(`${url}funcionario`, (req, res) => {
    const { ID_funcionario } = req.body;
    const { FK_pessoa } = req.body;
    const { FK_cargo } = req.body;
    const { data_adminissao } = req.body;
    const { status_conta } = req.body;
    const { data_available } = req.body;
    let sql =
        "UPDATE tbl_funcionario SET FK_pessoa=?, FK_cargo=?, data_adminissao=?, status_conta=?, data_available=? WHERE ID_funcionario=?";
    db.query(sql, [FK_pessoa, FK_cargo, data_adminissao, status_conta, data_available, ID_funcionario], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
}) */

putData.put(`${url}venda`, (req, res) => {
    const { ID_venda } = req.body;
    const { FK_pessoa } = req.body;
    const { FK_funcionario } = req.body;
    const { data_venda } = req.body;
    const { data_available } = req.body;
    let sql =
        "UPDATE tbl_estoque SET FK_pessoa=?, FK_funcionario=?, data_venda=?, data_available=? WHERE ID_venda=?";
    db.query(sql, [FK_pessoa, FK_funcionario, data_venda, data_available, ID_venda], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}vendaproduto`, (req, res) => {
    const { ID_venda_produto } = req.body;
    const { FK_venda } = req.body;
    const { FK_estoque } = req.body;
    const { quantida } = req.body;
    const { valor_total } = req.body;
    const { data_available } = req.body;
    let sql =
        "UPDATE tbl_venda_produto SET FK_venda=?, FK_estoque=?, quantida=?, valor_total=?, data_available=? WHERE ID_venda_produto=?";
    db.query(sql, [FK_venda, FK_estoque, quantida, valor_total, data_available, ID_venda_produto], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}pessoaendereco`, (req, res) => {
    const { FK_pessoa } = req.body;
    const { FK_endereco } = req.body;
    const { descricao } = req.body;
    const { data_avaliable } = req.body;
    let sql =
        "UPDATE tbl_pessoa_endereco SET descricao=?, data_avaliable=? WHERE FK_pessoa=? AND FK_endereco=?,";
    db.query(sql, [descricao, data_avaliable, FK_pessoa, FK_endereco], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
putData.put(`${url}attendereco`, (req, res) => {
    console.log(req.body)
    const { ID_endereco } = req.body;
    const { cidade } = req.body;
    const { bairro } = req.body;
    const { rua } = req.body;
    const { uf } = req.body;
    const { numero } = req.body;
    const { referencia } = req.body;
    const { cep } = req.body;
    const { FK_pessoa } = req.body;
    const { FK_fornecedor } = req.body;
    let sql =
        "UPDATE tbl_endereco SET cidade=?, bairro=?, rua=?, uf=?, numero=?, referencia=? , cep=? , FK_pessoa=?, FK_fornecedor=? WHERE ID_endereco=?";
    db.query(sql, [cidade, bairro, rua, uf, numero, referencia, cep, FK_pessoa, FK_fornecedor, ID_endereco], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


putData.put(`/putdata/putdecrementaquantidade/:quantidade/:id_estoque`, (req, res) => {
    const { id_estoque, quantidade } = req.params;

    console.log(id_estoque + " " + quantidade)
    let sql =
        "UPDATE tbl_estoque SET quantidade_atual= quantidade_atual - ? where ID_estoque = ?";
    db.query(sql, [quantidade, id_estoque], (err, result) => {
        if (err) res.send(err)
        else {
            res.send(result)
        }
    })
})

putData.put(`${url}/excluir`, (req, res) => {
    console.log(req)
    const { tabela } = req.body;
    const { id } = req.body;
    let sql =
        `UPDATE tbl_${tabela} SET data_available = false WHERE ID_${tabela} =?`;
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})



putData.put(`${url}funcionario`, MulterConfig.single('image'), (req, res) => {
    const { ID_pessoa, nome, sobrenome, cpf, celular, email, data_nascimento, FK_cargo, ID_funcionario, login, senha,
        nivelDeAcesso, cidade, bairro, rua, uf, numero, referencia, cep } = JSON.parse(req.body.novfuncionario)
    const americanDate = convertDateToAmericanFormat(data_nascimento);

    var imagem = null; // Obtém o nome do arquivo carregado
    if (req.file) {
        imagem = req.file.filename ? req.file.filename : null;
    }// Obtém o nome do arquivo carregado

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


            let sqlPessoa = "UPDATE tbl_pessoa SET nome=?, sobrenome=?, cpf=?, celular=?, email=?, data_nascimento=?, img_perfil=? where ID_pessoa = ?";
            connection.query(sqlPessoa, [nome, sobrenome, cpf, celular, email, americanDate, imagem, ID_pessoa], (err, pessoaResult) => {
                if (err) {
                    console.log(err);
                    connection.rollback(() => {
                        res.status(500).send('Erro ao atualziar os dados da pessoa');
                        connection.release();
                    });
                    return;
                }
                let sqlFuncionario = "UPDATE tbl_funcionario set FK_pessoa=?, FK_cargo=?, data_adminissao=?, status_conta=?, data_available=?, senha=?, login=?, nivel_acesso=?, configuracoes=? WHERE ID_funcionario =?";
                connection.query(sqlFuncionario, [ID_pessoa, FK_cargo, dataFormatada, true, true, senha, login, nivelDeAcesso, "", ID_funcionario], (err, funcionarioResult) => {
                    if (err) {
                        console.log(err);
                        connection.rollback(() => {
                            res.status(500).send('Erro ao atualizar os dados do funcionário');
                            connection.release();
                        });
                        return;
                    }
                    let sqlEndereco = "UPDATE tbl_endereco SET cidade=?, bairro=?, rua=?, uf=?, numero=?, referencia=?, cep=? WHERE FK_pessoa=?";
                    connection.query(sqlEndereco, [cidade, bairro, rua, uf, numero, referencia, cep, ID_pessoa], (err, enderecoResult) => {
                        if (err) {
                            console.log(err);
                            connection.rollback(() => {
                                res.status(500).send('Erro ao atualizar os dados do endereço');
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

putData.put(`${url}editEmpresa`, MulterConfigSys.array('image', 3), (req, res) => {
    const {
        emp_cnpj, emp_ie, emp_im, emp_nome, emp_nome_fantasia, emp_data, emp_logradouro, emp_numero, emp_complemento,
        emp_cep, emp_bairro, emp_municipio, emp_uf, emp_telefone, emp_imagem, emp_logomarca_claro,
        emp_logomarca_escuro, ID_empresa } = JSON.parse(req.body.novEmpresa)
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao obter conexão do pool');
            return;
        }

        var imagemEscura = null;
        if (!emp_logomarca_escuro) {
            if (req.files[0]) {
                imagemEscura = req.files[0].filename;
            }
        } else {
            imagemEscura = emp_logomarca_escuro;
        }
        var imagemClara = null;
        if (!emp_logomarca_claro) {
            if (req.files[1]) {
                imagemClara = req.files[1].filename;
            }
        } else {
            imagemClara = emp_logomarca_claro;
        }
        var imagemDesktop = null;
        if (!emp_imagem) {
            if (req.files[2]) {
                imagemDesktop = req.files[2].filename;
            }
        } else {
            imagemDesktop = emp_imagem;
        }

        let sql = "UPDATE tbl_empresa SET emp_cnpj=?,emp_ie=?,emp_im=?,emp_nome=?,emp_nome_fantasia=?,emp_data=?,emp_logradouro=?,emp_numero=?,emp_complemento=?,emp_cep=?,emp_bairro=?,emp_municipio=?,emp_uf=?,emp_telefone=?,emp_imagem=?,emp_logomarca_claro=?,emp_logomarca_escuro=? WHERE ID_empresa=?";
        connection.query(sql, [emp_cnpj, emp_ie, emp_im, emp_nome, emp_nome_fantasia, "2001-05-05", emp_logradouro, emp_numero, emp_complemento,
            emp_cep, emp_bairro, emp_municipio, emp_uf, emp_telefone, imagemDesktop, imagemClara,
            imagemEscura, 1], (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    console.log(err);
                    res.status(500).send('Erro ao atualizar os dados da empresa');
                } else {
                    res.send(result);
                }
            });
    })
});


module.exports = putData;