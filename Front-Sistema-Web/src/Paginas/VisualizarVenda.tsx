import { Grid, Box, Paper, Hidden } from "@mui/material";
import "../Estilos/Css/Customizacao.css";
import "../Estilos/Css/Customizacao.css";
import { imprimirNotaFiscal } from "../Utils/ImprimirNotaFiscal";
import NotaFiscal from "../Componentes/NotaFiscal";
import { InformacoesNotaFiscal, ModelVisualizarVenda } from "../Models/ModelVenda";
import { useEffect, useState } from "react";
import { Produto } from "../Interfaces/Produto";
import { formatarCpf, formatarPrecoRealSimbolo } from "../Utils/Validacoes/Mascaras";
import { themeComponents } from "../Tema/theme";
import { getData, getDataEdit } from "../Routes/getRoutes";
import { useParams } from "react-router-dom";


export default function VisualizarVenda(props: any) {
    const useTema = themeComponents(localStorage.getItem("USER_THEME"));
    const [notaFiscalInformacoes, setNotaFiscalInformacoes] = useState(new InformacoesNotaFiscal());
    const [dadosDaVenda, setDadosDaVenda] = useState(new ModelVisualizarVenda());
    const { idVenda } = useParams();

    // const emitirNotaFiscal = () => {
    //     setNotaFiscalInformacoes({
    //         nomeEmpresa: "Teste",
    //         produtos: dadosDaVenda.produtosVendidos,
    //         valorRecebido: 0,
    //         totalFinal: 20,
    //         troco: 0
    //     })
    //     imprimirNotaFiscal("notaFiscal", "Nota Fiscal");
    // }

    useEffect(() => {
        const fecthData = async () => {
            try {
                var dadosVenda = await getDataEdit('vendaEdit', idVenda);
                setDadosDaVenda({
                    cpf: dadosVenda.cpf,
                    dataVenda: dadosVenda.data_venda,
                    nomeCliente: dadosVenda.nome,
                    sobrenomeCliente: dadosVenda.sobrenome,
                    idCliente: dadosVenda.ID_pessoa,
                    idVenda: dadosVenda.ID_venda,
                    produtosVendidos: JSON.parse(dadosVenda.produtosDaVenda),
                    valorTotal: dadosVenda.valor_liquido,
                    quantidadeTotalProdutos: dadosVenda.quantidade_total_produtos
                })
            } catch (error) {

            }
        };
        fecthData();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>Venda #{dadosDaVenda.idVenda}</h3>
                </Grid>
                {/* <Grid item xs={12}>
                    <button onClick={() => emitirNotaFiscal()}>Teste nota fiscal</button>
                </Grid> */}
                <Grid item lg={6} xs={12}>
                    <Paper variant="outlined">
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3>INFORMAÇÕES DO CLIENTE</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">Nome do Cliente</h4>
                                    <p>{dadosDaVenda.nomeCliente} {dadosDaVenda.sobrenomeCliente}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">CPF do Cliente</h4>
                                    <p>{formatarCpf(dadosDaVenda.cpf)}</p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Paper variant="outlined">
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3>RESUMO DA COMPRA</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">Quantidade de Produtos</h4>
                                    <p>{dadosDaVenda.quantidadeTotalProdutos} {dadosDaVenda.quantidadeTotalProdutos > 1 ? "itens" : "item"}</p>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <h4 className="retirar-margem">Desconto</h4>
                                    <p>{formatarPrecoRealSimbolo(10)}</p>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">Valor Total</h4>
                                    <p>{formatarPrecoRealSimbolo(dadosDaVenda.valorTotal)}</p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div className="paper-produtos-comprados pagina-vendas">
                        <Grid container>
                            <Hidden mdUp>
                                <Grid item xs={3}>
                                    <h4 className="retirar-margem">Produtos</h4>
                                </Grid>
                            </Hidden>
                            <Hidden mdDown>
                                <Grid item xs={3}>
                                    <h4 className="retirar-margem">Produto</h4>
                                </Grid>
                                <Grid item xs={3}>
                                    <h4 className="centralizar-texto retirar-margem">Marca</h4>
                                </Grid>
                                <Grid item xs={2}>
                                    <h4 className="centralizar-texto retirar-margem">Valor Unitário</h4>
                                </Grid>
                                <Grid item xs={2}>
                                    <h4 className="centralizar-texto retirar-margem">Quantidade</h4>
                                </Grid>
                                <Grid item xs={2}>
                                    <h4 className="centralizar-texto retirar-margem">Valor Total</h4>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </div>
                    {dadosDaVenda.produtosVendidos.map((produto: any, index: any) => (

                        <div className="paper-produtos-comprados" style={{backgroundColor: useTema.palette.tabelaVenda.background}} key={index}>
                            <Hidden mdDown>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <p><b>{produto.nome}</b> - Cód: {produto.ID_produto}</p>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <p className="centralizar-texto ">{produto.marca}</p>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <p className="centralizar-texto">{formatarPrecoRealSimbolo(produto.valor_uni)}</p>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <p className="centralizar-texto">{produto.quantidade}</p>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <p className="centralizar-texto">{formatarPrecoRealSimbolo(produto.valor_total)}</p>
                                    </Grid>
                                </Grid>
                            </Hidden>
                            <Hidden mdUp>
                                <Grid item xs={12}>
                                    <div className="card-lista">
                                        <div>
                                            <p>{produto.nome} (Cód: {produto.ID_produto})</p>
                                            <p><b>Marca:</b> {produto.marca}</p>
                                            <p><b>Valor Unitário: </b>{" "}{formatarPrecoRealSimbolo(produto.valor_uni)}</p>
                                            <p><b>QTD: </b>{" "}{produto.quantidade}</p>
                                            <p><b>Valor Total: </b>{" "}{formatarPrecoRealSimbolo(produto.valor_total)}</p>
                                        </div>
                                    </div>
                                </Grid>
                            </Hidden>
                        </div>
                    ))}
                </Grid>
            </Grid>
            {/* <NotaFiscal nomeEmpresa={notaFiscalInformacoes.nomeEmpresa} produtos={lista} valorRecebido={notaFiscalInformacoes.valorRecebido} troco={0} totalFinal={notaFiscalInformacoes.totalFinal}></NotaFiscal> */}
        </>

    );
};

var lista = new Array<Produto>();

// lista.push({nome: "Caixa de lápis", quantidade: 1, desconto: 0, valorTotal: 20, ID_produto: "3432", valor_uni: 20});