import { Grid, TextField, Box, Paper, FormControl, Autocomplete, Button, Typography, BoxProps, IconButton, Divider, Tooltip, Hidden } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useStyles } from "../../Estilos/MakeStyles/StylesVendas";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../Estilos/Css/Customizacao.css";
import ModalAdicionarFornecedor from "../Modais/ModalAdicionarFornecedor";
import { useState } from "react";
import { Produto } from "../../Interfaces/Produto";
import { alterarQuantidade, converterValor } from "../../Utils/Tools";
import "../../Estilos/Css/ListaMobile.css";
import EditIcon from '@mui/icons-material/Edit';
import { propsPrimeiraEtapaCompras, propsPrimeiraEtapaVendas } from "../../Interfaces/Venda";
import { ItemProduto } from "../../Models/ModelProduto";
import { formatarPrecoReal, formatarPrecoRealSimbolo } from "../../Utils/Validacoes/Mascaras";
import { themeComponents } from "../../Tema/theme";
import "../../Estilos/Css/Vendas.css";
import "../../Estilos/Css/ListaMobile.css";

export default function PrimeiraEtapaVendas(props: propsPrimeiraEtapaCompras) {
    const classes = useStyles();
    const tema = themeComponents(localStorage.getItem("USER_THEME"));
    const [adicionarFornecedor, setAdicionarFornecedor] = useState(false);
    const abrirModal = () => setAdicionarFornecedor(true);
    const fecharModal = () => setAdicionarFornecedor(false);
    const [quantidade, setQuantidade] = useState(0);
    // const [valorUnitario, setValorUnitario] = useState(0);
    const [totalProduto, setTotalProduto] = useState(0);
    const [descontoPorcentagem, setDescontoPorcentagem] = useState(0);
    const [valorUnitarioProduto, setValorUnitarioProduto] = useState(0);
    const [valorUnitarioString, setValorUnitarioString] = useState('0,00');
    const [produto, setProduto] = useState(new ItemProduto());
    var listaProdutos = props.compra.listaProdutos;

    const adicionarProduto = (produto: any) => {
        if (produto.ID_produto !== 0 && produto.nome !== "") {
            var novoProduto: Produto;
            novoProduto = {
                ID_produto: produto.ID_produto,
                nome: produto.nome,
                valor_uni: valorUnitarioProduto,
                valor_total: totalProduto,
                quantidade: quantidade,
                desconto: descontoPorcentagem,
            }
            props.compra.listaProdutos.push(novoProduto);
            props.calcularTotalCompra(props.compra.listaProdutos);
            var indexProduto = props.listaProdBanco.findIndex((prod: any) => prod.ID_produto === produto.ID_produto);
            props.listaProdBanco.splice(indexProduto, 1);
            alterarProduto(null);

        } else {
            alert("Por favor, escolha um produto!");
        }

    }

    const removerProduto = (index: number, produto: any) => {
        var produtosIncluidos = Array.from(listaProdutos);
        produtosIncluidos.splice(index, 1);
        props.compra.listaProdutos = produtosIncluidos;
        props.calcularTotalCompra(produtosIncluidos);

        var listaProdutosAtual = Array.from(props.listaProdBanco);
        listaProdutosAtual.push(produto);
        props.alterarListaProdBanco(listaProdutosAtual);
    }

    const editarProduto = (index: any, produto: any) => {
        if (produto != null) {
            setProduto(produto);
            setQuantidade(produto.quantidade);
            setValorUnitarioProduto(produto.valor_uni);
            setDescontoPorcentagem(produto.desconto)
            setTotalProduto(produto.valor_total);
            removerProduto(index, produto);
        }
    }

    const alterarProduto = (produto: any) => {
        if (produto !== null) {
            setProduto(produto);
            setQuantidade(1);
            setValorUnitarioProduto(valorUnitarioProduto);
            calcularValorTotalProduto(1, valorUnitarioProduto, 0);
        } else {
            setProduto(new ItemProduto());
            setQuantidade(0);
            setValorUnitarioProduto(0);
            calcularValorTotalProduto(0, 0, 0);
        }
    }

    const mudarQuantidade = (opcao: number, quantidade: number) => {
        var quantidadeAlterada = alterarQuantidade(opcao, quantidade);
        setQuantidade(quantidadeAlterada);
        calcularValorTotalProduto(quantidadeAlterada, valorUnitarioProduto, descontoPorcentagem);
    }

    const onChangeQuantidade = (e: any) => {
        if (e.target.value != null && e.target.value != undefined && e.target.value != "") {
            var quantidadeAlterada = parseInt(e.target.value);
            setQuantidade(quantidadeAlterada);
            calcularValorTotalProduto(quantidadeAlterada, valorUnitarioProduto, descontoPorcentagem);
        } else {
            setQuantidade(0);
            calcularValorTotalProduto(0, valorUnitarioProduto, descontoPorcentagem);
        }
    }

    const calcularValorTotalProduto = (quantidade: number, valorCompra: number, desc: any) => {
        var descAux = calcularDesconto(desc);
        if (descAux > 0) {
            var totalDesconto = valorCompra * descAux;
            totalDesconto = valorCompra - totalDesconto;
            var totalComDesconto = (totalDesconto * quantidade);
            setTotalProduto(totalComDesconto);

        } else {
            var totalSemDesconto = (valorCompra * quantidade);
            setTotalProduto(totalSemDesconto);
        }
    }

    const calcularDesconto = (desc: any) => {
        var descAux = desc;
        setDescontoPorcentagem(descAux);
        var descontoAux = 0;

        if (desc > 0) {
            descontoAux = descAux / 100;
        }

        return descontoAux;
    }

    const onChangeValorUnitario = (val: any) => {
        var valAux = converterValor(val);
        setValorUnitarioProduto(valAux);
        setValorUnitarioString(formatarPrecoReal(val.toString()));
        calcularValorTotalProduto(quantidade, valAux, descontoPorcentagem);
    }

    return (
        <>
            <ModalAdicionarFornecedor adicionarFornecedor={adicionarFornecedor} fecharModal={fecharModal}></ModalAdicionarFornecedor>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper variant="outlined">
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="fornecedor"
                                                renderOption={(props, option) => {
                                                    return (
                                                        <Box component="li" {...props} key={option.id}>
                                                            {option.razao_social}
                                                        </Box>
                                                    );
                                                }}
                                                options={props.listaFornecedor}
                                                onChange={(event: any, novaOpcao: any) => {
                                                    if (novaOpcao != null) {
                                                        props.alterarFornecedor(novaOpcao);
                                                        props.compra.fornecedorId = novaOpcao.ID_fornecedor // Convertendo para tipo numérico

                                                    }
                                                }}
                                                value={props.fornecedor}
                                                getOptionLabel={(option) => option.razao_social}
                                                isOptionEqualToValue={(option: any, value: any) =>
                                                    option.id === value.id}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label={'Fornecedor'}
                                                    />}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box justifyContent={"flex-end"} display={"flex"}>
                                        <Button onClick={abrirModal}>
                                            Novo Fornecedor
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            disablePortal
                                            id="produto"
                                            options={props.listaProdBanco}
                                            onChange={(event: any, novaOpcao: any) => {
                                                alterarProduto(novaOpcao);
                                            }}
                                            value={produto}
                                            getOptionLabel={(option) => option.nome}
                                            isOptionEqualToValue={(option: any, value: any) =>
                                                option.ID_produto === value.ID_produto
                                            }
                                            renderInput={(params) => <TextField {...params} label="Produto" />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} md={4} xs={12}>
                                    <div className="alinhar-centro ">
                                        <Item>
                                            <IconButton disabled={quantidade == 0 ? true : false} onClick={() => mudarQuantidade(2, quantidade)}>
                                                <DoNotDisturbOnIcon />
                                            </IconButton>
                                        </Item>
                                        <Item>
                                            <TextField
                                                onChange={(e) => {
                                                    onChangeQuantidade(e)
                                                }
                                                }
                                                value={quantidade}>
                                            </TextField>
                                        </Item>
                                        <Item>
                                            <IconButton onClick={() => mudarQuantidade(1, quantidade)}>
                                                <AddCircleIcon className={classes.alinharMeio} />
                                            </IconButton>
                                        </Item>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} sm={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Valor unitário"
                                        variant="standard"
                                        value={valorUnitarioString}
                                        onChange={(e) => onChangeValorUnitario(e.target.value)}
                                    />
                                </Grid>
                                <Grid item lg={3} md={2} sm={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Desconto %"
                                        variant="standard"
                                        value={descontoPorcentagem}
                                        onChange={(e) => {
                                            calcularValorTotalProduto(quantidade, valorUnitarioProduto, e.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={4} xs={12}>
                                    <Typography>Valor Total</Typography>
                                    <Typography>{formatarPrecoRealSimbolo(totalProduto)}</Typography>
                                </Grid>
                                <Grid item lg={3} md={4} sm={4} xs={12}>
                                    <Button fullWidth variant="contained" endIcon={<AddCircleIcon />} color="success" onClick={() => adicionarProduto(produto)}>Add Produto</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {listaProdutos && listaProdutos.length > 0 ?
                <div>
                    <div className="paper-produtos-comprados pagina-entrada-estoque distancia-lista">
                        <Grid container>
                            <Grid item xs={4}>
                                <Hidden mdDown>
                                    <h4 className="retirar-margem">Produto</h4>
                                </Hidden>
                                <Hidden mdUp>
                                    <h4 className="retirar-margem">Produtos</h4>
                                </Hidden>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item xs={3}>
                                    <h4 className="retirar-margem">Valor Unitário</h4>
                                </Grid>
                                <Grid item xs={2}>
                                    <h4 className="retirar-margem">QTD.</h4>
                                </Grid>
                                <Grid item xs={2}>
                                    <h4 className="retirar-margem">Valor Total</h4>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </div>
                    <Grid item xs={12}>
                        {listaProdutos.map((prod: any, index: any) => {
                            return (
                                <div key={index}>
                                    <div className="lista-nova-compra" style={{ backgroundColor: tema.palette.tabelaVenda.background }}>
                                        <Grid container>
                                            <Hidden mdDown>
                                                <Grid item xs={4}>
                                                    <p>{prod.nome}</p>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <p>{formatarPrecoRealSimbolo(prod.valor_uni)}</p>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <p>{prod.quantidade}</p>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <p>{formatarPrecoRealSimbolo(prod.valor_total)}</p>
                                                </Grid>
                                                <Grid item xs={1} className="alinhar-fim">
                                                    <Tooltip title="editar" >
                                                        <IconButton onClick={() => editarProduto(index, prod)}>
                                                            <EditIcon ></EditIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Remover" >
                                                        <IconButton onClick={() => removerProduto(index, prod)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Hidden>
                                            <Hidden mdUp>
                                                <Grid item xs={12}>
                                                    <div className="card-produto">
                                                        <div>
                                                            <p>{prod.nome}</p>
                                                            <p><b>Valor Unitário: </b>{" "}{formatarPrecoRealSimbolo(prod.valor_uni)}</p>
                                                            <p><b>QTD: </b>{" "}{prod.quantidade}</p>
                                                            <p><b>Valor Total: </b>{" "}{formatarPrecoRealSimbolo(prod.valor_total)}</p>
                                                        </div>
                                                        <div className="icons-acoes">
                                                            <Tooltip title="editar" >
                                                                <IconButton onClick={() => editarProduto(index, prod)}>
                                                                    <EditIcon></EditIcon>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Remover" >
                                                                <IconButton onClick={() => removerProduto(index, prod)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Hidden>
                                        </Grid>
                                    </div>
                                    <Divider></Divider>
                                </div>
                            );
                        })}

                    </Grid>
                    <Grid item xs={12}>
                        <div className="div-box-valores">
                            <h3>Quantidade Total:  {props.compra.quantidadeTotal} {props.compra.quantidadeTotal === 1 ? "item" : "itens"} </h3>
                            <h3>Valor Total: {formatarPrecoRealSimbolo(props.compra.valorTotal)} </h3>
                        </div>
                    </Grid>
                </div> : <></>
            }
        </>

    );
};

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                ml: 0.5,
                mr: 0.5,
                mt: "auto",
                mb: "auto",
                ...sx,
            }}
            {...other}
        />
    );
}
