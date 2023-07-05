import { Grid, TextField, Box, Paper, FormControl, Autocomplete, Button, Typography, BoxProps, IconButton, Divider, Tooltip, Hidden } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useStyles } from "../../Estilos/MakeStyles/StylesVendas";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../Estilos/Css/Customizacao.css";
import ModalAdicionarCliente from "../Modais/ModalAdicionarCliente";
import { useState } from "react";
import { Produto } from "../../Interfaces/Produto";
import { alterarQuantidade } from "../../Utils/Tools";
import "../../Estilos/Css/ListaMobile.css";
import EditIcon from '@mui/icons-material/Edit';
import { propsPrimeiraEtapaVendas } from "../../Interfaces/Venda";
import { ItemProduto } from "../../Models/ModelProduto";
import { formatarPrecoRealSimbolo } from "../../Utils/Validacoes/Mascaras";
import { themeComponents } from "../../Tema/theme";

export default function PrimeiraEtapaVendas(props: propsPrimeiraEtapaVendas) {
    const classes = useStyles();
    const tema = themeComponents(localStorage.getItem("USER_THEME"));
    const [adicionarCliente, setAdicionarCliente] = useState(false);
    const abrirModal = () => setAdicionarCliente(true);
    const fecharModal = () => setAdicionarCliente(false);
    const [quantidade, setQuantidade] = useState(0);
    const [valorUnitario, setValorUnitario] = useState(0);
    const [totalProduto, setTotalProduto] = useState(0);
    const [clienteAtual, setClienteAtual] = useState({id: 0, nome: ""});
    const [descontoPorcentagem, setDescontoPorcentagem] = useState(0);
    const [produto, setProduto] = useState(new ItemProduto());
    var listaProdutos = props.venda.listaProdutos;

    const adicionarProduto = (produto: any) => {
        if (produto.ID_produto !== 0 && produto.nome !== "") {
            if (quantidade < 1) {
                alert("Por favor, defina uma quantidade!");
            } else {
                var novoProduto: Produto;
                novoProduto = {
                    ID_produto: produto.ID_produto,
                    nome: produto.nome,
                    valor_uni: produto.valor_uni,
                    valor_total: totalProduto,
                    quantidade: quantidade,
                    desconto: descontoPorcentagem,
                }
                props.venda.listaProdutos.push(novoProduto);
                props.calcularTotalCompra(props.venda.listaProdutos);
                var indexProduto = props.listaProdBanco.findIndex((prod: any) => prod.ID_produto === produto.ID_produto);
                props.listaProdBanco.splice(indexProduto, 1);
                alterarProduto(null);
            }


        } else {
            alert("Por favor, escolha um produto!");
        }

    }

    const removerProduto = (index: number, produto: any) => {
        var produtosIncluidos = Array.from(listaProdutos);
        produtosIncluidos.splice(index, 1);
        props.venda.listaProdutos = produtosIncluidos;
        props.calcularTotalCompra(produtosIncluidos);

        var listaProdutosAtual = Array.from(props.listaProdBanco);
        listaProdutosAtual.push(produto);
        props.alterarListaProdBanco(listaProdutosAtual);
    }

    const editarProduto = (index: any, produto: any) => {
        if (produto != null) {
            setProduto(produto);
            setQuantidade(produto.quantidade);
            setValorUnitario(produto.valor_uni);
            setTotalProduto(produto.valor_total);
            removerProduto(index, produto);
        }
    }

    const alterarProduto = (produto: any) => {
        if (produto !== null) {
            setProduto(produto);
            setQuantidade(1);
            setValorUnitario(produto.valor_uni);
            calcularValorTotalProduto(1, produto.valor_uni, 0);
        } else {
            setProduto(new ItemProduto());
            setQuantidade(0);
            setValorUnitario(0);
            calcularValorTotalProduto(0, 0, 0);
        }
    }

    const mudarQuantidade = (opcao: number, quantidade: number) => {
        var quantidadeAlterada = alterarQuantidade(opcao, quantidade);
        setQuantidade(quantidadeAlterada);
        calcularValorTotalProduto(quantidadeAlterada, valorUnitario, descontoPorcentagem);
    }

    const onChangeQuantidade = (e: any) => {
        if (e.target.value != null && e.target.value != undefined && e.target.value != "") {
            var quantidadeAlterada = parseInt(e.target.value);
            setQuantidade(quantidadeAlterada);
            calcularValorTotalProduto(quantidadeAlterada, valorUnitario, descontoPorcentagem);
        } else {
            setQuantidade(0);
            calcularValorTotalProduto(0, valorUnitario, descontoPorcentagem);
        }
    }

    const calcularValorTotalProduto = (quantidade: number, valorUnitario: number, desc: any) => {
        var descAux = calcularDesconto(desc);
        if (descAux > 0) {
            var totalDesconto = valorUnitario * descAux;
            totalDesconto = valorUnitario - totalDesconto;
            var totalComDesconto = (totalDesconto * quantidade);
            setTotalProduto(totalComDesconto);

        } else {
            var totalSemDesconto = (valorUnitario * quantidade);
            setTotalProduto(totalSemDesconto);
        }
    }

    const calcularDesconto = (desc: any) => {
        var descAux = parseFloat(desc);
        setDescontoPorcentagem(descAux);
        var descontoAux = 0;

        if (desc > 0) {
            descontoAux = descAux / 100;
        }

        return descontoAux;
    }

    const alterarCliente = (cliente: any) => {
        setClienteAtual({id: cliente.id, nome: cliente.nome });
        props.venda.clienteId = cliente.id;
        props.venda.clienteNome = cliente.nome;
        
    }

    return (
        <>
            <ModalAdicionarCliente adicionarCliente={adicionarCliente} fecharModal={fecharModal}></ModalAdicionarCliente>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper variant="outlined">
                        <Box p={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="cliente"
                                                renderOption={(props, option) => {
                                                    return (
                                                        <Box component="li" {...props} key={option.id}>
                                                            {option.nome}
                                                        </Box>
                                                    );
                                                }}
                                                options={props.listaCliente}
                                                onChange={(event: any, novaOpcao: any) => {
                                                    if (novaOpcao != null) {
                                                        alterarCliente(novaOpcao);
                                                    }
                                                }}
                                                value={clienteAtual}
                                                getOptionLabel={(option) => option.nome}
                                                isOptionEqualToValue={(option: any, value: any) =>
                                                    option.id === value.id}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label={'Cliente'}
                                                    />}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box justifyContent={"flex-end"} display={"flex"}>
                                        <Button onClick={abrirModal}>
                                            Novo Cliente
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
                                    <Typography>Valor Unitário </Typography>
                                    <Typography>{formatarPrecoRealSimbolo(valorUnitario)}</Typography>
                                </Grid>
                                <Grid item lg={3} md={2} sm={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Desconto %"
                                        variant="standard"
                                        type="number"
                                        onChange={(e) => {
                                            calcularValorTotalProduto(quantidade, valorUnitario, e.target.value);
                                        }}
                                        value={descontoPorcentagem}
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
                    <div className="paper-produtos-comprados pagina-vendas distancia-lista">
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
                                    <div className="lista-nova-venda" style={{ backgroundColor: tema.palette.tabelaVenda.background }}>
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
                            <h3>Quantidade Total:  {props.venda.quantidadeTotal} {props.venda.quantidadeTotal === 1 ? "item" : "itens"} </h3>
                            <h3>Valor Total: {formatarPrecoRealSimbolo(props.venda.valorTotal)} </h3>
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
