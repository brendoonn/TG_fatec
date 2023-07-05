import { Grid, Box, Paper, FormControl, Typography, TextField, Autocomplete } from "@mui/material";
import "../../Estilos/Css/Customizacao.css";
import { useState } from "react";
import { propsSegundaEtapaVendas } from "../../Interfaces/Venda";
import { formatarPrecoReal, formatarPrecoRealSimbolo } from "../../Utils/Validacoes/Mascaras";

export default function SegundaEtapaVendas(props: propsSegundaEtapaVendas) {
    const [valorRecebido, setValorRecebido] = useState("0,00");

    const alterarPagamento = (formaPagamento: any) => {
        if (formaPagamento !== null) {
            props.venda.meioPagamento = formaPagamento.id;
        }
    }

    const calcularTroco = (valor: any) => {
        if (valor === "" || valor === null) {
            setValorRecebido("0,00");
        }
        else {
            var mascara = formatarPrecoReal(valor);
            setValorRecebido(mascara);
            var valorConvertido = parseFloat(mascara.replace(',', '.'));
            var troco = valorConvertido - props.venda.valorTotal;
            props.venda.valorRecebido = valorConvertido;
            props.venda.troco = troco;
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <h3>Informações Financeiras</h3>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                            <Autocomplete
                                                id="FormaPagamento"
                                                renderOption={(props, option) => {
                                                    return (
                                                        <Box component="li" {...props} key={option.id}>
                                                            {option.forPag}
                                                        </Box>
                                                    );
                                                }}
                                                options={props.listaFormaPagamento}
                                                onChange={(event: any, novaOpcao: any) => {
                                                    if (novaOpcao != null) {
                                                        alterarPagamento(novaOpcao);
                                                    }
                                                }}
                                                getOptionLabel={(option) => option.forPag}
                                                isOptionEqualToValue={(option: any, value: any) =>
                                                    option.ID_formaPagemento === value.id}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label={'Forma de Pagamento'}
                                                />}
                                            />

                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <TextField
                                        label={"Valor Recebido"}
                                        name={"valorRecebido"}
                                        fullWidth
                                        onChange={(e) => calcularTroco(e.target.value)}
                                        value={valorRecebido}
                                    >
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <h3>Informações da venda</h3>
                            <Paper variant="outlined">
                                <Box p={2}>
                                    <Grid container>
                                        <Grid item lg={6} md={6} sm={6}>
                                            <h4 className="retirar-margem">Cliente</h4>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <Typography>{props.venda.clienteNome}</Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6}>
                                            <h4 className="retirar-margem">Quantidade Total</h4>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <Typography>{props.venda.quantidadeTotal === 1 ? (props.venda.quantidadeTotal + " item") : (props.venda.quantidadeTotal + " itens")} </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6}>
                                            <h4 className="retirar-margem">Valor Total</h4>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <Typography>{formatarPrecoRealSimbolo(props.venda.valorTotal)} </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
};

