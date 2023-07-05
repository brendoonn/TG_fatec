import { Box, Grid } from "@mui/material";
import { ItemProduto } from "../Models/ModelProduto";
import React, { useEffect, useState } from "react";
import { getData } from "../Routes/getRoutes";
import { Produto } from "../Interfaces/Produto";
import { calcularQuantidadeTotalCompra, calcularValorTotalCompra } from "../Utils/Tools";
import { Compra } from "../Models/ModelCompra";
import PrimeiraEtapaCompras from "../Componentes/Compra/PrimeiraEtapaCompras";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import SegundaEtapaCompras from "../Componentes/Compra/SegundaEtapaCompras";
import { postData } from "../Routes/postRoutes";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../Componentes/Modais/ModalLoading";


export default function AdicionarEntEstoque() {
    const [listaProd, setListaProd] = useState(new Array<ItemProduto>());
    const [listaFornecedor, setListaForn] = useState(new Array<ItemProduto>());
    const [fornecedor, setFornecedor] = useState({ id: 0, razao_social: "" });
    const [compra, setCompra] = useState(new Compra());
    const etapas = ['Informações da Compra', 'Confirmar'];
    const [etapaAtiva, setEtapaAtiva] = React.useState(0);
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

    const proximaEtapa = () => {
        if (etapaAtiva === 0) {
            if (fornecedor.razao_social !== "") {
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
        compra.quantidadeTotal = quantidade;
        compra.valorTotal = total;
        setQtdProdutos(quantidade);
    }

    const seStateValues = (atributo: string, val: any) => {
        setCompra({ ...compra, [atributo]: val });
    };



    const lançarEstoque = async (listaComp: Compra) => {
        //compraproduto
        setLoading(true);
        var retorno = await postData('compraproduto', listaComp);
        
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Produto(s) adicionado(s) com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }


    const handleClick = () => {
        lançarEstoque(compra).catch((error) => {
            console.log(error)
        });
    };



    function renderizarEtapas(etapa: number) {
        switch (etapa) {
            case 0:
                return <PrimeiraEtapaCompras
                    listaProdBanco={listaProd}
                    alterarListaProdBanco={setListaProd}
                    alterarFornecedor={setFornecedor}
                    fornecedor={fornecedor}
                    listaFornecedor={listaFornecedor}
                    calcularTotalCompra={calcularTotalCompra}
                    alterarVenda={seStateValues}
                    compra={compra}
                />
            default:
                return <SegundaEtapaCompras
                    fornecedor={fornecedor}
                    compra={compra}
                />;
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
                                <Button onClick={handleClick}>
                                    Lançar produtos no Estoque
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
