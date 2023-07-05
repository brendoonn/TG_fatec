import { Grid, Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimeiraEtapaVendas from "../Componentes/Vendas/PrimeiraEtapaVendas";
import SegundaEtapaVendas from "../Componentes/Vendas/SegundaEtapaVendas";
import { Produto } from "../Interfaces/Produto";
import { calcularQuantidadeTotalCompra, calcularValorTotalCompra } from "../Utils/Tools";
import { getData } from "../Routes/getRoutes";
import { Venda, formaPagamento } from "../Models/ModelVenda";
import TerceiraEtapaVendas from "../Componentes/Vendas/TerceiraEtapaVendas";
import { ItemProduto } from "../Models/ModelProduto";
import { postData } from "../Routes/postRoutes";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { useNavigate } from "react-router-dom";
import { store } from "../store/store";

export default function AdicionarVenda() {
    const etapas = ['Informações da Venda', 'Pagamento'];
    const [etapaAtiva, setEtapaAtiva] = React.useState(0);
    // const [cliente, setCliente] = useState({ id: 0, nome: "" });
    const [venda, setVenda] = useState(new Venda());
    const [listaFormaPagamento, setListaFormaPagamento] = useState(new Array<formaPagamento>());
    const [listaProd, setListaProd] = useState(new Array<ItemProduto>());
    const [listaCliente, setListaClientes] = useState([]);
    const [qtdProdutos, setQtdProdutos] = useState(0);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            navigate(0);
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaCliente = await getData('pessoa');
                if (listaCliente.length > 0) {
                    listaCliente = listaCliente.map((item: any) => {
                        return { id: item.ID_pessoa, nome: item.nome + " " + item.sobrenome };

                    });
                    setListaClientes(listaCliente);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaProd = await getData('produtoParaNovaVenda');
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
                var listaFormaPagemento = await getData('formapagamento');
                if (listaFormaPagemento.length > 0) {
                    listaFormaPagemento = listaFormaPagemento.map((item: any) => {
                        return { id: item.ID_forma_pagamento, forPag: item.forma_pag};
                    });
                    setListaFormaPagamento(listaFormaPagemento);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);



    const proximaEtapa = () => {
        if (etapaAtiva === 0) {
            if (venda.clienteNome !== "") {
                setEtapaAtiva(etapaAtiva + 1);
            }
        } else {
            setEtapaAtiva(etapaAtiva + 1);
        }
    };

    const voltarEtapa = () => {
        setEtapaAtiva((prevActiveStep) => prevActiveStep - 1);
    };

    const calcularTotalCompra = (listaProdutosAtualizada: Array<Produto>) => {
        var quantidade = calcularQuantidadeTotalCompra(listaProdutosAtualizada);
        var total = calcularValorTotalCompra(listaProdutosAtualizada);
        venda.quantidadeTotal = quantidade;
        venda.valorTotal = total;
        setQtdProdutos(quantidade);
    }


    const cadastrarVenda = async (venda: Venda) => {

        venda.funcionarioId = store.getState().autenticar.idUsuario
        console.log(venda)
          setLoading(true);
         var retorno = await postData('venda', venda);
         if (retorno === 200) {
             setLoading(false);
             setModalConfirmacao({ mensagem: "Venda realizada com sucesso!", confirmacao: true, abrir: false });
             proximaEtapa() 
         } else {
             setLoading(false);
             setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
         }
         
    }

    const seStateValues = (atributo: string, val: any) => {
        setVenda({ ...venda, [atributo]: val });
    };

    function renderizarEtapas(etapa: number) {
        switch (etapa) {
            case 0:
                return <PrimeiraEtapaVendas
                    listaProdBanco={listaProd}
                    alterarListaProdBanco={setListaProd}
                    listaCliente={listaCliente}
                    calcularTotalCompra={calcularTotalCompra}
                    alterarVenda={seStateValues}
                    venda={venda}
                />;
            case 1:
                return <SegundaEtapaVendas
                    venda={venda}
                    listaFormaPagamento={listaFormaPagamento}
                />;
            default:
                return <TerceiraEtapaVendas
                    produtos={venda.listaProdutos}
                    valorRecebido={venda.valorRecebido}
                    totalFinal={venda.valorTotal}
                    troco={venda.troco}
                ></TerceiraEtapaVendas>;
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Stepper activeStep={etapaAtiva}>
                        {etapas.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Grid>
            </Grid>
            <React.Fragment>
                <Box mt={6}>
                    {renderizarEtapas(etapaAtiva)}
                </Box>
            </React.Fragment>
            {qtdProdutos > 0 ?
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pb: 3 }}>
                        {etapaAtiva > 0 && etapaAtiva <= etapas.length - 1 ?
                            <Button
                                color="inherit"
                                onClick={voltarEtapa}
                                sx={{ mr: 1 }}
                            >
                                Voltar
                            </Button> : <></>}
                        <Box sx={{ flex: '1 1 auto' }} />
                        {etapaAtiva < etapas.length - 1 ?
                            <Button onClick={proximaEtapa}>
                                Próximo
                            </Button> : etapaAtiva === etapas.length - 1 ?
                            <Button onClick={() => cadastrarVenda(venda)}>
                                Finalizar Venda
                            </Button> : <></>}
                    </Box>
                </Grid> : <></>}
            <ModalEnvioConfirmado
                mensagem={modalConfirmacao.mensagem}
                abrir={modalConfirmacao.abrir}
                confirmacao={modalConfirmacao.confirmacao}
                fecharModal={fecharModal}
            ></ModalEnvioConfirmado>
            <ModalLoading abrir={ativarLoading}></ModalLoading>
        </div >

    )
}
