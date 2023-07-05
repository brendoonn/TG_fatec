const axios = require("axios");


//função que vai pegar os dados ta tabela devida
async function realizaVenda(quantidade, produto) {

    try {
        var total = await axios.get('http://localhost:3001/getdata/getquantidadeatual/' + produto);
        var produtoAtual = total.data[0]
        if (produtoAtual.quantidade_total >= quantidade) {
            try {
                console.log("entrou no try")
                var compras = await axios.get('http://localhost:3001/getdata/getconsultacompras/' + produto);
                var compraAtua = compras.data;
                for (let regCompra = 0; regCompra < compraAtua.length; regCompra++) {
                    console.log("entrou no for" + regCompra)
                    if (compraAtua[regCompra].quantidade_atual >= quantidade) {
                        console.log("primeira validação")
                        try {
                            var resulDecremento = await axios.put(`http://localhost:3001/putdata/putdecrementaquantidade/` + quantidade + "/" + compraAtua[regCompra].ID_estoque)
                            quantidade = compraAtua[regCompra].quantidade_atual - quantidade
                            if (quantidade <= 0) {
                                return resulDecremento;
                            }
                            return resulDecremento;
                        }
                        catch (exception) {
                        }
                    }
                    else if(compraAtua[regCompra].quantidade_atual > 0){
                        console.log("segunda validação")
                        try {
                            var resulDecremento = await axios.put(`http://localhost:3001/putdata/putdecrementaquantidade/` + compraAtua[regCompra].quantidade_atual + "/" + compraAtua[regCompra].ID_estoque)
                            console.log(resulDecremento)
                            quantidade = quantidade - compraAtua[regCompra].quantidade_atual 
                            if (quantidade <= 0) {
                                console.log("entrou aqui")
                                return resulDecremento;
                            }
                            else{
                            }
                        }
                        catch (exception) {
                        }
                    }
                    else{
                      console.log("terceira validação")
                    }
                }
            }
            catch (exception) {
            }
        }
    }
    catch (exception) {
        //console.log("ERRO", exception);
        return exception;
    }
}

getData.get('/getdata/getquantidadeatual/:idprod', (req, res)=>{
    const {idprod} = req.params;
    const sql =`SELECT p.ID_produto, p.nome, SUM(e.quantidade_atual) AS quantidade_total
                FROM tbl_produto p
                INNER JOIN tbl_estoque e ON p.ID_produto = e.FK_produto
                WHERE p.data_available = 1 and p.ID_produto = ?
                GROUP BY p.ID_produto, p.nome;`
    db.query(sql, [idprod], (err, result) =>{
        if (err)console.log(err)
    else{
        res.send(result)
    }})
})
getData.get('/getdata/getconsultacompras/:id', (req, res)=>{
    const {id} = req.params;
    const sql =`select * from tbl_estoque where tbl_estoque.FK_produto = ? `
    db.query(sql, [id], (err, result) =>{
        if (err)console.log(err)
    else{
        res.send(result)
    }})
})
putData.put(`/putdata/putdecrementaquantidade/:quantidade/:id_estoque`, (req, res)=>{
    const {id_estoque, quantidade} = req.params;

    console.log(id_estoque + " " + quantidade)
    let sql = 
    "UPDATE tbl_estoque SET quantidade_atual= quantidade_atual - ? where ID_estoque = ?";
        db.query(sql,[quantidade, id_estoque], (err, result) =>{
        if (err)res.send(err)        
        else{
            res.send(result)
        }})
})

module.exports = {
    realizaVenda: realizaVenda
};