import { Grid, Box, Paper, FormControl, Typography, InputLabel, Select, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import "../../Estilos/Css/Customizacao.css";
import { useEffect, useState } from "react";
import { propsSegundaEtapaCompras } from "../../Interfaces/Venda";
import { formatarPrecoReal, formatarPrecoRealSimbolo } from "../../Utils/Validacoes/Mascaras";
import { Produto } from "../../Interfaces/Produto";


export default function SegundaEtapaCompras(props: propsSegundaEtapaCompras) {
    const [listaProduto, setListaProd] = useState<Produto[]>([])
    // const [formaPagamento, setFormaPagamento] = useState("");
    // const [valorRecebido, setValorRecebido] = useState("0,00");
    // const trocarFormaPagamento = (event: SelectChangeEvent) => {
    //     setFormaPagamento(event.target.value as string);
    // };

    useEffect(() => {
        if (props.compra.listaProdutos) {
          setListaProd(props.compra.listaProdutos);
        }
    }, [props.compra.listaProdutos]);
    

    // const calcularTroco = (valor: any) => {
    //     if (valor === "" || valor === null) {
    //         setValorRecebido("0,00");
    //     }
    //     else {
    //         var mascara = formatarPrecoReal(valor);
    //         setValorRecebido(mascara);
    //         var valorConvertido = parseFloat(mascara.replace(',', '.'));
    //         var troco = valorConvertido - props.compra.valorTotal;
    //         props.compra.valorRecebido = valorConvertido;
    //         props.compra.troco = troco;
    //     }
    // }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <h3>Informações da Compra</h3>
                            <Paper variant="outlined">
                                <Box p={2}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6}>
                                            <h4 className="retirar-margem">Fornecedor</h4>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <Typography>{props.fornecedor.razao_social}</Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6}>
                                            <h4 className="retirar-margem">Quantidade Total</h4>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <Typography>{props.compra.quantidadeTotal === 1 ? (props.compra.quantidadeTotal + " item") : (props.compra.quantidadeTotal + " itens")} </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6}>
                                            <h4 className="retirar-margem">Valor Total</h4>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <Typography>{formatarPrecoRealSimbolo(props.compra.valorTotal)} </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Paper elevation={1}>
                        <Box p={3}>
                        <h3>Produtos comprados:</h3>
                        <ul>
                            {listaProduto.map((produto, index) => (
                            <li key={index}>{produto.quantidade +"x "+ produto.nome}</li>
                            ))}
                        </ul>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
};

