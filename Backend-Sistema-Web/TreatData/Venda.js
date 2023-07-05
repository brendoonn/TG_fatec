const axios = require("axios");


//função que vai pegar os dados ta tabela devida


async function realizaVenda(quantidade, produto, fkVenda, valor) {
    console.log(produto)
    var quantidadeInfo = quantidade;
    try {
        //pega quantidade atual
        var total = await axios.get('http://localhost:3001/getdata/getquantidadeatual/' + produto);
        var produtoAtual = total.data[0]
        if (produtoAtual.quantidade_total >= quantidadeInfo) {
            try {
                //consulta as compras daquele produto no estoque        
                var compras = await axios.get('http://localhost:3001/getdata/getconsultacompras/' + produto);
                var compraAtua = compras.data;
                for (let regCompra = 0; regCompra < compraAtua.length; regCompra++) {
                    //se a quantidade for maior decrementa            
                    if (compraAtua[regCompra].quantidade_atual >= quantidadeInfo) {
                        try {
                            var resulDecremento = await axios.put(`http://localhost:3001/putdata/putdecrementaquantidade/` + quantidadeInfo + "/" + compraAtua[regCompra].ID_estoque)
                            const data = {
                                FK_venda: fkVenda,
                                FK_estoque: compraAtua[regCompra].ID_estoque,
                                quantida: quantidadeInfo,
                                valor_uni: valor,
                                data_available: true
                            };
                            var resulLancamento = await axios.post(`http://localhost:3001/postdata/postvendaproduto`, data)
                            return resulDecremento;
                        }
                        catch (exception) {
                        }
                    }
                    //se não, decrementa a quantidade disponível da ultima compra  
                    else if (compraAtua[regCompra].quantidade_atual > 0) {
                        try {
                            var resulDecremento = await axios.put(`http://localhost:3001/putdata/putdecrementaquantidade/` + compraAtua[regCompra].quantidade_atual + "/" + compraAtua[regCompra].ID_estoque)
                            quantidadeInfo = quantidadeInfo - compraAtua[regCompra].quantidade_atual
                            const data = {
                                FK_venda: fkVenda,
                                FK_estoque: compraAtua[regCompra].ID_estoque,
                                quantida: compraAtua[regCompra].quantidade_atual,
                                valor_uni: valor,
                                data_available: true
                            };
                            var resulLancamento = await axios.post(`http://localhost:3001/postdata/postvendaproduto`, data)
                            console.log(resulLancamento)

                        }
                        catch (exception) {
                        }
                    }
                    else {
                    }
                }
            }
            catch (exception) {
            }
        } else {
            console.log("menor")
        }
    }
    catch (exception) {
        //console.log("ERRO", exception);
        return exception;
    }
}
module.exports = {
    realizaVenda: realizaVenda
};