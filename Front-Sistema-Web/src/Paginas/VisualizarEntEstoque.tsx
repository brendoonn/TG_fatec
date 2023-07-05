import { Grid, Box, Paper, Hidden } from "@mui/material";
import "../Estilos/Css/Customizacao.css";
import { formatarCnpj, formatarPrecoRealSimbolo } from "../Utils/Validacoes/Mascaras";
import { themeComponents } from "../Tema/theme";
import { useEffect, useState } from "react";
import { getData, getDataEdit } from "../Routes/getRoutes";
import { VisualizarCompra } from "../Models/ModelCompra";
import { useParams } from "react-router-dom";


export default function VisuazarEntEstoque() {
    const useTema = themeComponents(localStorage.getItem("USER_THEME"));
    const { idCompra } = useParams();
    const [dadosDaCompra, setDadosDaCompra] = useState(new VisualizarCompra());

    useEffect(() => {
        const fecthData = async () => {
            try {
                var dadosCompra = await getDataEdit('compraEdit', idCompra);
                setDadosDaCompra({
                    idCompra: dadosCompra.ID_compra,
                    idFornecedor: dadosCompra.ID_fornecedor,
                    cnpj: dadosCompra.cnpj,
                    dataCompra: dadosCompra.data_compra,
                    estoque: JSON.parse(dadosCompra.estoque),
                    razaoSocial: dadosCompra.razao_social,
                    valorCompra: dadosCompra.valor_compra,
                    quantidadeTotalProdutos: dadosCompra.quantidade_total_produtos
                });
            } catch (error) {

            }
        };
        fecthData();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>Compra #{dadosDaCompra.idCompra}</h3>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Paper variant="outlined">
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3>INFORMAÇÕES DO FORNECEDOR</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">Razão Social</h4>
                                    <p>{dadosDaCompra.razaoSocial}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">CNPJ</h4>
                                    <p>{formatarCnpj(dadosDaCompra.cnpj)}</p>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <h4 className="retirar-margem">Endereço</h4>
                                    <p>Rua, 10, 01123-000, São Paulo - SP</p>
                                </Grid> */}
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={6} xs={12} sx={{height: "auto"}}>
                    <Paper variant="outlined" sx={{height: "100%"}}>
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3>RESUMO DA COMPRA</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">Quantidade de Produtos</h4>
                                    <p>{dadosDaCompra.quantidadeTotalProdutos} {dadosDaCompra.quantidadeTotalProdutos > 1 ? "itens" : "item"}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="retirar-margem">Valor Total</h4>
                                    <p>{formatarPrecoRealSimbolo(dadosDaCompra.valorCompra)}</p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div className="paper-produtos-comprados pagina-entrada-estoque">
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
                    {dadosDaCompra.estoque.map((produto: any, index: any) => (
                        <div className="paper-produtos-comprados" style={{ backgroundColor: useTema.palette.tabelaVenda.background }} key={index}>
                            <Hidden mdDown>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <p><b>{produto.nome_produto}</b> - Cód: {produto.codigo_produto}</p>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <p className="centralizar-texto ">{produto.marca}</p>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <p className="centralizar-texto">{formatarPrecoRealSimbolo(produto.valor_unitario)}</p>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <p className="centralizar-texto">{produto.quantidade_inicial}</p>
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
                                            <p><b>{produto.nome_produto}</b> - Cód: {produto.codigo_produto}</p>
                                            <p><b>Marca:</b>{" "}{produto.marca}</p>
                                            <p><b>Valor Unitário: </b>{" "}{formatarPrecoRealSimbolo(produto.valor_unitario)}</p>
                                            <p><b>QTD: </b>{" "}{produto.quantidade_inicial}</p>
                                            <p><b>Valor Total: </b>{" "}{formatarPrecoRealSimbolo(produto.valor_total)}</p>
                                        </div>
                                    </div>
                                </Grid>
                            </Hidden>
                        </div>
                    ))}
                </Grid>
            </Grid>
        </>

    );
};
