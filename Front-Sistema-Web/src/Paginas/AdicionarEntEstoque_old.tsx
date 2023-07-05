import { ItemProduto } from "../Models/ModelProduto";
import React,{ useEffect, useState } from "react";
import { getData } from "../Routes/getRoutes";
import { Produto } from "../Interfaces/Produto";
import { calcularQuantidadeTotalCompra, calcularValorTotalCompra } from "../Utils/Tools";
import { Compra } from "../Models/ModelCompra";
import PrimeiraEtapaCompras from "../Componentes/Compra/PrimeiraEtapaCompras";


export default function AdicionarEntEstoque() {
    const [listaProd, setListaProd] = useState(new Array<ItemProduto>());
    const [listaFornecedor, setListaForn] = useState(new Array<ItemProduto>());
    const [fornecedor, setFornecedor] = useState({ id: 0, nome: "" });
    const [compra, setCompra] = useState(new Compra());


    const etapas = ['Informações da Venda', 'Pagamento'];
    const [etapaAtiva, setEtapaAtiva] = React.useState(0);
    const [qtdProdutos, setQtdProdutos] = useState(0);



    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaProd = await getData('produto');
                if (listaProd.length > 0) {
                    setListaProd(listaProd);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaFornecedor = await getData('fornecedor');
                if (listaFornecedor.length > 0) {
                    setListaForn(listaFornecedor);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

 
    const calcularTotalCompra = (listaProdutosAtualizada: Array<Produto>) => {
        var quantidade = calcularQuantidadeTotalCompra(listaProdutosAtualizada);
        var total = calcularValorTotalCompra(listaProdutosAtualizada);
        compra.quantidadeTotal = quantidade;
        compra.valorTotal = total;
        setQtdProdutos(quantidade);
    }

    const seStateValues = (atributo: string, val: any) => {
        setCompra({ ...compra, [atributo]: val });
    };

    return (
        <>
             <PrimeiraEtapaCompras
                    listaProdBanco={listaProd}
                    alterarListaProdBanco={setListaProd}
                    alterarFornecedor={setFornecedor}
                    fornecedor={fornecedor}
                    listaFornecedor={listaFornecedor}
                    calcularTotalCompra={calcularTotalCompra}
                    alterarVenda={seStateValues}
                    compra={compra}
            />
        </>
    );
}

