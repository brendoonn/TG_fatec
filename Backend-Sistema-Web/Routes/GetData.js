const express = require('express')
const Connection = require('../DataBase/Connection')
const getData = express.Router()
const mysql = require("mysql");
const fs = require('fs');
const axios = require('axios');
const path = require('path');


//const db = require(Connection.Repos);
const db = mysql.createPool({
    host: "seu servidor",
    user: "usuario com direitos",
    password: "senha do usuario",
    database: "nome do seu banco de dados",
})



getData.get('/getdata/getcargo', (req, res) => {
    const sql = "SELECT * FROM tbl_cargo WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getcategoria', (req, res) => {
    const sql = "SELECT * FROM tbl_categoria WHERE data_available = 1"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getendereco', (req, res) => {
    const sql = "SELECT * FROM tbl_endereco WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getestoque', (req, res) => {
    const sql = "SELECT * FROM tbl_estoque WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getfornecedor', (req, res) => {
    const sql = "SELECT * FROM tbl_fornecedor WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getfornecedorendereco', (req, res) => {
    const sql = "SELECT * FROM tbl_fornecedor_endereco WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getfuncionario', (req, res) => {
    const sql = "SELECT tbl_funcionario.*, tbl_pessoa.nome, tbl_pessoa.sobrenome FROM tbl_funcionario " +
        "INNER JOIN tbl_pessoa ON tbl_funcionario.FK_pessoa = tbl_pessoa.ID_pessoa  WHERE tbl_pessoa.data_available = true";
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getmarca', (req, res) => {
    const sql = "SELECT * FROM tbl_marca WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getpessoa', (req, res) => {
    const sql = "SELECT * FROM tbl_pessoa WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getpessoaendereco', (req, res) => {
    const sql = "SELECT * FROM tbl_pessoa_endereco WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getproduto', (req, res) => {
    const sql =
        ("SELECT " +
            "tbl_produto.ID_produto, " +
            "tbl_produto.nome, " +
            "tbl_produto.valor_uni, " +
            "tbl_produto.peso, " +
            "tbl_produto.descricao, " +
            "tbl_marca.ID_marca, " +
            "tbl_marca.nome_marca, " +
            "tbl_categoria.ID_categoria, " +
            "tbl_categoria.categoria, " +
            "tbl_categoria.desc_categoria, " +
            "(SUM(tbl_estoque.quantidade_atual) / tbl_produto.min_recomendado) * 100 AS porcentagem_estoque, " +
            "SUM(tbl_estoque.quantidade_atual) AS quantidade_total " +
            "FROM " +
            "tbl_produto " +
            "INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca " +
            "INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria " +
            "LEFT JOIN tbl_estoque ON tbl_produto.ID_produto = tbl_estoque.FK_produto " +
            "WHERE tbl_produto.data_available = true " +
            "GROUP BY " +
            "tbl_produto.ID_produto, " +
            "tbl_produto.nome, " +
            "tbl_produto.valor_uni, " +
            "tbl_produto.peso, " +
            "tbl_produto.descricao, " +
            "tbl_marca.ID_marca, " +
            "tbl_marca.nome_marca, " +
            "tbl_categoria.ID_categoria, " +
            "tbl_categoria.categoria, " +
            "tbl_categoria.desc_categoria " +
            "ORDER BY " +
            "tbl_produto.ID_produto ASC;")
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getprodutoEdit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
      tbl_produto.ID_produto, tbl_produto.nome, tbl_produto.valor_uni, tbl_produto.peso, tbl_produto.descricao, tbl_produto.min_recomendado,
      tbl_marca.ID_marca, tbl_marca.nome_marca,
      tbl_categoria.ID_categoria, tbl_categoria.categoria, tbl_categoria.desc_categoria
    FROM
      tbl_produto
      INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca
      INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria
    WHERE
      tbl_produto.ID_produto = ? and tbl_produto.data_available = true
  `;
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})







getData.get('/getdata/getprodsimp', (req, res) => {
    const sql = "select * from tbl_produto where dava_avaliable = true and data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})



getData.get('/getdata/getcompraproduto', (req, res) => {
    const sql = "SELECT tbl_compra.ID_compra, tbl_compra.data_compra, tbl_compra.valor_compra, " +
        "tbl_fornecedor.razao_social" +
        " FROM tbl_compra, tbl_fornecedor " +
        "where tbl_fornecedor.ID_fornecedor = tbl_compra.FK_fornecedor and tbl_compra.data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


getData.get('/getdata/getestoqueprodutos', (req, res) => {
    const sql =
        ("SELECT tbl_produto.ID_produto, tbl_produto.nome, tbl_produto.valor_uni, tbl_produto.peso, tbl_produto.descricao, " +
            "tbl_estoque.ID_estoque, tbl_estoque.quantidade_atual, tbl_estoque.data_validade_lote," +
            "tbl_compra.ID_compra, tbl_compra.data_compra, tbl_compra.valor_compra," +
            "tbl_marca.ID_marca, tbl_marca.nome_marca," +
            "tbl_categoria.ID_categoria, tbl_categoria.categoria, tbl_categoria.desc_categoria," +
            "tbl_fornecedor.ID_fornecedor, tbl_fornecedor.cnpj, tbl_fornecedor.razao_social, tbl_fornecedor.email, tbl_fornecedor.telefone " +
            "FROM tbl_produto, tbl_estoque, tbl_compra, tbl_marca, tbl_categoria, tbl_fornecedor " +
            "WHERE tbl_produto.FK_categoria = tbl_categoria.ID_categoria AND " +
            "tbl_produto.FK_marca = tbl_marca.ID_marca AND " +
            "tbl_estoque.FK_produto = tbl_produto.ID_produto AND " +
            "tbl_estoque.FK_compra = tbl_compra.ID_compra")
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getcompra', (req, res) => {
    const sql = "SELECT * FROM tbl_compra WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/verificapessoa/:cpf', (req, res) => {
    let { cpf } = req.params;
    const sql = `select ID_pessoa from tbl_pessoa where cpf="${cpf}" and data_available = true`
    console.log(cpf)
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/verificacpf/:cpf', (req, res) => {
    let { cpf } = req.params;
    const sql = `select cpf from tbl_pessoa where cpf="${cpf}" data_available = true`
    console.log(cpf)
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/verificafornecedor/:cnpj', (req, res) => {
    let { cnpj } = req.params;
    cnpjVerificado = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    const sql = `select ID_fornecedor from tbl_fornecedor where cnpj="${cnpjVerificado}" and data_available = true`
    console.log(cnpj)
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


getData.get('/getdata/verificacnpj/:cnpj', (req, res) => {
    let { cnpj } = req.params;
    const sql = `select cnpj from tbl_fornecedor where cnpj="${cnpj}"`
    console.log(cnpj)
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getbaixavenda', (req, res) => {
    const sql = `SELECT v.descricao, vp.quantidade, p.nome, p.ID_produto, e.ID_estoque, v.ID_venda
    FROM tbl_venda v
    JOIN tbl_venda_produto vp ON v.ID_venda = vp.FK_venda
    JOIN tbl_estoque e ON e.ID_estoque = vp.FK_estoque
    JOIN tbl_produto p ON p.ID_produto = e.FK_produto
    WHERE v.descricao <> ''
    `
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


getData.get('/getdata/getfornecedoredit/:id', (req, res) => {
    const { id } = req.params;
    const sql =
        `SELECT f.ID_fornecedor,f.cnpj,f.razao_social, f.email,f.telefone,
            e.ID_endereco, e.cidade,e.bairro,e.rua,e.uf,e.referencia,e.numero,e.cep ,e.fk_fornecedor
            FROM 
            tbl_fornecedor f 
            INNER JOIN tbl_endereco e ON f.ID_fornecedor = e.fk_fornecedor 
            WHERE 
            f.ID_fornecedor = ?;`
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getclienteedit/:id', (req, res) => {
    const { id } = req.params;
    const sql =
        `SELECT p.ID_pessoa,p.nome,p.sobrenome, p.cpf, p.data_nascimento,p.celular, p.email, p.data_available, p.img_perfil,
            e.ID_endereco, e.cidade,e.bairro,e.rua,e.uf,e.referencia ,e.numero,e.cep ,e.fk_fornecedor
            FROM 
            tbl_pessoa p
            INNER JOIN tbl_endereco e ON p.ID_pessoa = e.fk_pessoa 
            WHERE 
            p.ID_pessoa = ?;`
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


getData.get('/getdata/verificauser/:login/:senha', (req, res) => {
    let { login, senha } = req.params;
    const sql =
        "SELECT " +
        "p.nome, p.sobrenome, p.ID_pessoa, " +
        "f.nivel_acesso, f.ID_funcionario " +
        "FROM " +
        "tbl_funcionario f " +
        "INNER JOIN tbl_pessoa p ON f.FK_pessoa = p.ID_pessoa " +
        "WHERE " +
        "f.login = ? and f.senha = ? and f.data_available = true ";

    db.query(sql, [login, senha], (err, result) => {
        if (err) console.log(err)
        else {
            if (result.length === 0) {
                res.send(false)
            }
            else {
                res.send(result[0])
            }

        }
    })
})


getData.get('/getdata/getvenda', (req, res) => {
    const sql =
        "SELECT " +
        "v.ID_venda, " +
        "v.data_venda, " +
        "v.valor_liquido AS valor_total, " +
        "pc.ID_pessoa AS cliente_id, " +
        "pc.nome AS cliente_nome, " +
        "pc.sobrenome, " +
        "pf.ID_pessoa AS funcionario_id, " +
        "pf.nome AS funcionario_nome, " +
        "pf.sobrenome AS funcionario_sobrenome, " +
        "SUM(vp.quantidade) AS total_produtos_vendidos " +
        "FROM " +
        "tbl_venda v " +
        "LEFT JOIN tbl_pessoa pc ON v.FK_pessoa = pc.ID_pessoa " +
        "INNER JOIN tbl_pessoa pf ON v.FK_funcionario = pf.ID_pessoa " +
        "INNER JOIN tbl_venda_produto vp ON v.ID_venda = vp.FK_venda " +
        "INNER JOIN tbl_estoque e ON vp.FK_estoque = e.ID_estoque " +
        "INNER JOIN tbl_produto p ON e.FK_produto = p.ID_produto " +
        "INNER JOIN tbl_compra cp ON e.FK_compra = cp.ID_compra " +
        "GROUP BY " +
        "v.ID_venda, " +
        "v.data_venda, " +
        "pc.ID_pessoa, " +
        "pc.nome, " +
        "pf.ID_pessoa, " +
        "pf.nome; "
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getvendaproduto', (req, res) => {
    const sql = "SELECT tbl_venda_produto.ID_venda_produto, tbl_venda_produto." +
        "" +
        "" +
        " FROM tbl_venda_produto" +
        ""
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getformapagamento', (req, res) => {
    const sql = "SELECT ID_forma_pagamento, forma_pag " +
        "FROM tbl_forma_pagamento " +
        "WHERE data_available = true"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getquantidadeatual/:idprod', (req, res) => {
    const { idprod } = req.params;
    const sql = `SELECT p.ID_produto, p.nome, SUM(e.quantidade_atual) AS quantidade_total
                FROM tbl_produto p
                INNER JOIN tbl_estoque e ON p.ID_produto = e.FK_produto
                WHERE p.data_available = 1 and p.ID_produto = ?
                GROUP BY p.ID_produto, p.nome;`
    db.query(sql, [idprod], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/getconsultacompras/:id', (req, res) => {
    const { id } = req.params;
    const sql = `select * from tbl_estoque where tbl_estoque.FK_produto = ? `
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getimage', (req, res) => {
    const imagePath = path.join(__dirname, 'caminho/para/a/imagem.jpg');

    fs.readFile(imagePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao ler a imagem');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
    });
});




getData.get('/getdata/getfuncionarioEdit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
        tbl_funcionario.ID_funcionario, tbl_funcionario.login, tbl_funcionario.senha, tbl_funcionario.nivel_acesso, 
        tbl_pessoa.ID_pessoa, tbl_pessoa.nome, tbl_pessoa.sobrenome, tbl_pessoa.cpf, tbl_pessoa.data_nascimento, tbl_pessoa.celular, tbl_pessoa.email,tbl_pessoa.img_perfil,
        tbl_cargo.ID_cargo, tbl_cargo.cargo,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'cep', tbl_endereco.cep,
                'cidade', tbl_endereco.cidade,
                'rua', tbl_endereco.rua,
                'bairro', tbl_endereco.bairro,
                'numero', tbl_endereco.numero,
                'uf', tbl_endereco.uf,
                'complemento', tbl_endereco.referencia
            )
        ) AS enderecos
    FROM 
        tbl_funcionario
        INNER JOIN tbl_pessoa ON tbl_funcionario.FK_pessoa = tbl_pessoa.ID_pessoa
        INNER JOIN tbl_cargo ON tbl_funcionario.FK_cargo = tbl_cargo.ID_cargo
        LEFT JOIN tbl_endereco ON tbl_pessoa.ID_pessoa = tbl_endereco.FK_pessoa
    WHERE
        tbl_funcionario.ID_funcionario = ?
    GROUP BY
        tbl_funcionario.login, tbl_funcionario.senha, tbl_funcionario.nivel_acesso, 
        tbl_pessoa.ID_pessoa, tbl_pessoa.nome, tbl_pessoa.sobrenome, tbl_pessoa.cpf, tbl_pessoa.data_nascimento, tbl_pessoa.celular, tbl_pessoa.email, tbl_pessoa.img_perfil,
        tbl_cargo.ID_cargo, tbl_cargo.cargo;
    
        `;
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getcompraEdit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
        tbl_compra.ID_compra, tbl_compra.data_compra, tbl_compra.valor_compra,
        tbl_fornecedor.ID_fornecedor, tbl_fornecedor.cnpj, tbl_fornecedor.razao_social, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'FK_compra', tbl_estoque.FK_compra,
                'codigo_produto', tbl_estoque.FK_produto,
                'nome_produto', tbl_produto.nome,
                'quantidade_inicial', tbl_estoque.quantidade_inicial,
                'quantidade_atual', tbl_estoque.quantidade_atual,
                'valor_unitario', tbl_estoque.valor_uni_compra,
                'valor_total', tbl_estoque.valor_uni_compra * tbl_estoque.quantidade_inicial,
                'marca', tbl_marca.nome_marca
            )
        ) AS estoque,
        SUM(tbl_estoque.quantidade_inicial) AS quantidade_total_produtos
    FROM 
        tbl_compra
        INNER JOIN tbl_fornecedor ON tbl_compra.FK_fornecedor = tbl_fornecedor.ID_fornecedor
        LEFT JOIN tbl_estoque ON tbl_compra.ID_compra = tbl_estoque.FK_compra
        LEFT JOIN tbl_produto ON tbl_estoque.FK_produto = tbl_produto.ID_produto
        LEFT JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca
    WHERE
        tbl_compra.ID_compra = ?
    GROUP BY
        tbl_compra.data_compra, tbl_compra.valor_compra, tbl_compra.FK_fornecedor, 
        tbl_fornecedor.ID_fornecedor, tbl_fornecedor.cnpj, tbl_fornecedor.razao_social    
        `;
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result[0])
        }
    })
})

getData.get('/getdata/getvendaEdit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT 
    tbl_venda.ID_venda, tbl_venda.data_venda, tbl_venda.desconto, tbl_venda.valor_bruto, tbl_venda.valor_liquido,
    tbl_pessoa.ID_pessoa, tbl_pessoa.cpf, tbl_pessoa.nome, tbl_pessoa.sobrenome, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'quantidade', tbl_venda_produto.quantidade,
            'ID_produto', tbl_produto.ID_produto,
            'nome', tbl_produto.nome,
            'marca', tbl_marca.nome_marca,
            'valor_uni', tbl_venda_produto.valor_venda_uni,
            'valor_total', tbl_venda_produto.valor_venda_uni * tbl_venda_produto.quantidade 
        )
    ) AS produtosDaVenda,
    SUM(tbl_venda_produto.quantidade) AS quantidade_total_produtos
FROM 
    tbl_venda
    LEFT JOIN tbl_pessoa ON tbl_venda.FK_pessoa = tbl_pessoa.ID_pessoa
    INNER JOIN tbl_venda_produto ON tbl_venda.ID_venda = tbl_venda_produto.FK_venda
    INNER JOIN tbl_estoque ON tbl_venda_produto.FK_estoque = tbl_estoque.ID_estoque
    INNER JOIN tbl_produto ON tbl_estoque.FK_produto = tbl_produto.ID_produto
    LEFT JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca
WHERE
    tbl_venda.ID_venda = ?
GROUP BY
    tbl_venda.ID_venda, tbl_venda.data_venda,
    tbl_pessoa.ID_pessoa, tbl_pessoa.cpf, tbl_pessoa.nome, tbl_pessoa.sobrenome

        `;
    db.query(sql, [id], (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result[0])
        }
    })
})

const caminhoImagemSistema = path.join(__dirname, '..', '..', '..', 'public', 'Imagens', 'Sistema');
getData.get('/getdataimage/sistema/:nomeArquivo', (req, res) => {
    const nomeArquivo = req.params.nomeArquivo;
    const caminhoCompleto = path.join(caminhoImagemSistema, nomeArquivo);

    res.sendFile(caminhoCompleto, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao obter a imagem');
        }
    });
});


const caminhoImagemUsuario = path.join(__dirname, '..', '..', '..', 'public', 'Imagens', 'Usuarios');
getData.get('/getdataimage/usuario/:nomeArquivo', (req, res) => {
    const nomeArquivo = req.params.nomeArquivo;
    const caminhoCompleto = path.join(caminhoImagemUsuario, nomeArquivo);

    res.sendFile(caminhoCompleto, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao obter a imagem');
        }
    });
});



getData.get('/getdata/getempresa', (req, res) => {
    const sql = "SELECT * FROM tbl_empresa"
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get('/getdata/getprodutoParaNovaVenda', (req, res) => {
    const sql =
        ("SELECT " +
            "tbl_produto.ID_produto, " +
            "tbl_produto.nome, " +
            "tbl_produto.valor_uni, " +
            "tbl_produto.peso, " +
            "tbl_produto.descricao, " +
            "tbl_marca.ID_marca, " +
            "tbl_marca.nome_marca, " +
            "tbl_categoria.ID_categoria, " +
            "tbl_categoria.categoria, " +
            "tbl_categoria.desc_categoria, " +
            "(SUM(tbl_estoque.quantidade_atual) / tbl_produto.min_recomendado) * 100 AS porcentagem_estoque, " +
            "SUM(tbl_estoque.quantidade_atual) AS quantidade_total " +
            "FROM " +
            "tbl_produto " +
            "INNER JOIN tbl_marca ON tbl_produto.FK_marca = tbl_marca.ID_marca " +
            "INNER JOIN tbl_categoria ON tbl_produto.FK_categoria = tbl_categoria.ID_categoria " +
            "LEFT JOIN tbl_estoque ON tbl_produto.ID_produto = tbl_estoque.FK_produto " +
            "WHERE tbl_produto.data_available = true " +
            "GROUP BY " +
            "tbl_produto.ID_produto, " +
            "tbl_produto.nome, " +
            "tbl_produto.valor_uni, " +
            "tbl_produto.peso, " +
            "tbl_produto.descricao, " +
            "tbl_marca.ID_marca, " +
            "tbl_marca.nome_marca, " +
            "tbl_categoria.ID_categoria, " +
            "tbl_categoria.categoria, " +
            "tbl_categoria.desc_categoria " +
            "HAVING quantidade_total > 0 " +
            "ORDER BY " +
            "tbl_produto.ID_produto ASC;")
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})
getData.get('/getdata/  ', (req, res) => {
    const sql = `SELECT *
                FROM tbl_venda
                JOIN tbl_venda_produto ON tbl_venda.ID_venda = tbl_venda_produto.FK_venda
                WHERE MONTH(tbl_venda.data_venda) = MONTH(CURRENT_DATE())`
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


getData.get('/getdata/getpopulagrafico', (req, res) => {
    const sql = `SELECT
                    categoria AS id,
                    'dark.greenAccent[500]' AS color,
                    CONCAT('[', GROUP_CONCAT(
                    JSON_OBJECT(
                        'x', mes,
                        'y', total_vendas
                    )
                    ORDER BY mes
                    ), ']') AS data
                FROM (
                    SELECT
                    c.categoria,
                    MONTH(v.data_venda) AS mes,
                    SUM(vp.quantidade) AS total_vendas
                    FROM
                    tbl_venda_produto vp
                    JOIN
                    tbl_estoque e ON vp.FK_estoque = e.ID_estoque
                    JOIN
                    tbl_produto p ON e.FK_produto = p.ID_produto
                    JOIN
                    tbl_categoria c ON p.FK_categoria = c.ID_categoria
                    JOIN
                    tbl_venda v ON vp.FK_venda = v.ID_venda
                    GROUP BY
                    c.categoria, mes
                ) subquery
                GROUP BY
                    categoria
                ORDER BY
                    SUM(total_vendas) DESC
                LIMIT 5;`
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})



getData.get("/getdata/getVendasAno", (req, res) => {
    const sql = `
    SELECT id, JSON_ARRAYAGG(JSON_OBJECT('x', CASE
        WHEN mes = 1 THEN 'Janeiro'
        WHEN mes = 2 THEN 'Fevereiro'
        WHEN mes = 3 THEN 'Março'
        WHEN mes = 4 THEN 'Abril'
        WHEN mes = 5 THEN 'Maio'
        WHEN mes = 6 THEN 'Junho'
        WHEN mes = 7 THEN 'Julho'
        WHEN mes = 8 THEN 'Agosto'
        WHEN mes = 9 THEN 'Setembro'
        WHEN mes = 10 THEN 'Outubro'
        WHEN mes = 11 THEN 'Novembro'
        WHEN mes = 12 THEN 'Dezembro'
        ELSE 'Mês Desconhecido'
        END, 'y', total_vendas)) AS data
FROM (
  SELECT c.categoria AS id, 
         MONTH(v.data_venda) AS mes, 
         SUM(vp.quantidade) AS total_vendas
  FROM tbl_venda_produto vp
  JOIN tbl_estoque e ON vp.FK_estoque = e.ID_estoque
  JOIN tbl_produto p ON e.FK_produto = p.ID_produto
  JOIN tbl_categoria c ON p.FK_categoria = c.ID_categoria
  JOIN tbl_venda v ON vp.FK_venda = v.ID_venda
  WHERE YEAR(v.data_venda) = YEAR(CURRENT_DATE)
  GROUP BY c.categoria, mes
) AS vendas_por_mes
GROUP BY id
LIMIT 5;
    `

    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get("/getdata/getTotalVendas", (req, res) => {
    const sql = `
    SELECT SUM(vp.quantidade) AS total_vendas
FROM tbl_venda_produto vp
JOIN tbl_estoque e ON vp.FK_estoque = e.ID_estoque
JOIN tbl_produto p ON e.FK_produto = p.ID_produto
JOIN tbl_categoria c ON p.FK_categoria = c.ID_categoria
JOIN tbl_venda v ON vp.FK_venda = v.ID_venda
WHERE YEAR(v.data_venda) = YEAR(CURRENT_DATE);
    `
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


getData.get("/getdata/getMarcasMes", (req, res) => {
    const sql = `
    SELECT m.nome_marca AS label, m.ID_marca AS id, SUM(vp.quantidade) AS value
FROM tbl_venda_produto vp
JOIN tbl_estoque e ON vp.FK_estoque = e.ID_estoque
JOIN tbl_produto p ON e.FK_produto = p.ID_produto
JOIN tbl_marca m ON p.FK_marca = m.ID_marca
JOIN tbl_venda v ON vp.FK_venda = v.ID_venda
WHERE MONTH(v.data_venda) = MONTH(CURRENT_DATE)
GROUP BY m.nome_marca, m.ID_marca
ORDER BY value DESC
LIMIT 5;
    `
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get("/getdata/getProdutosMes", (req, res) => {
    const sql = `
    SELECT p.nome AS label, p.nome AS id, SUM(vp.quantidade) AS value
FROM tbl_venda_produto vp
JOIN tbl_estoque e ON vp.FK_estoque = e.ID_estoque
JOIN tbl_produto p ON e.FK_produto = p.ID_produto
JOIN tbl_venda v ON vp.FK_venda = v.ID_venda
WHERE MONTH(v.data_venda) = MONTH(CURRENT_DATE)
GROUP BY p.nome, p.ID_produto
ORDER BY value DESC
LIMIT 10;
    `
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get("/getdata/getTotalVendasMes", (req, res) => {
    const sql = `
    SELECT SUM(vp.quantidade) AS total_vendas
FROM tbl_venda_produto vp
JOIN tbl_estoque e ON vp.FK_estoque = e.ID_estoque
JOIN tbl_produto p ON e.FK_produto = p.ID_produto
JOIN tbl_categoria c ON p.FK_categoria = c.ID_categoria
JOIN tbl_venda v ON vp.FK_venda = v.ID_venda
WHERE YEAR(v.data_venda) = YEAR(CURRENT_DATE)
  AND MONTH(v.data_venda) = MONTH(CURRENT_DATE);
    `
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

getData.get("/getdata/getTotalCompraMes", (req, res) => {
    const sql = `
    SELECT 
    SUM(tbl_compra.valor_compra) AS total_compras
FROM 
    tbl_compra
WHERE
    YEAR(tbl_compra.data_compra) = YEAR(CURRENT_DATE)
    AND MONTH(tbl_compra.data_compra) = MONTH(CURRENT_DATE);
    `
    db.query(sql, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})


module.exports = getData;