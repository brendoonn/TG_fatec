import { FormControl, Grid, Paper, TextField, Box, Typography, Autocomplete, Divider, Hidden, getCardActionAreaUtilityClass } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import { Categoria, ItemProduto, Marca, ModelProduto } from "../Models/ModelProduto";
import { getData, getDataEdit } from "../Routes/getRoutes";
import { formatarPrecoPadrao, formatarPrecoReal, formatarPrecoRealSimbolo } from "../Utils/Validacoes/Mascaras";
import { schemaValidacaoProduto } from "../Constantes/SchemasDeValidacao";
import { useLocation, useParams } from 'react-router-dom';
import { putData } from "../Routes/putRoutes";
import { Produto, ProdutoPost } from "../Interfaces/Produto";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { converterValor } from "../Utils/Tools";
//import { ProdutoPost } from '../Interfaces/Produto';

export default function Editarproduto() {

    const [listaCategoria, setListaCategoria] = useState<Categoria[]>([]);
    const [listaMarca, setListaMarca] = useState<Marca[]>([]);
    //const [dados, setDados] = useState<ProdutoPost>({ID_produto: "", nome: "", valor_uni: 0, peso: 0, descricao: "", FK_categoria: 0, FK_marca: 0, data_available: 0});
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [opcaoCategoria, setOpcaoCategoria] = useState(new Categoria);
    const [opcaoMarca, setOpcaoMarca] = useState(new Marca);
    const [ativarLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [dados, setDados] = useState(new ModelProduto());

    useEffect(() => {
        const fecthData = async () => {
            var obterProduto = new Array<ItemProduto>();
            var obterCategorias = new Array<Categoria>();
            var obterMarcas = new Array<Marca>();
            try {
                obterProduto = await getDataEdit('produtoEdit', id);
                console.log(obterProduto);
                validacao.setFieldValue("FK_categoria", obterProduto[0].ID_categoria);
                validacao.setFieldValue("nome", obterProduto[0].nome);
                validacao.setFieldValue("peso", obterProduto[0].peso);
                validacao.setFieldValue("ID_produto", obterProduto[0].ID_produto);
                validacao.setFieldValue("valorUnitario", formatarPrecoPadrao(obterProduto[0].valor_uni));
                validacao.setFieldValue("FK_marca", obterProduto[0].ID_marca);
                validacao.setFieldValue("min_recomendado", obterProduto[0].min_recomendado);
                setDados(validacao.values);

                //obtém categorias
                var obterCategorias: Categoria[] = await getData('categoria');
                setListaCategoria(obterCategorias);
                var encontrarCategoria = obterCategorias.find(c => c.ID_categoria === obterProduto[0].ID_categoria);
                if (encontrarCategoria !== null && encontrarCategoria !== undefined) {
                    setOpcaoCategoria(encontrarCategoria);
                }

                //obtém marcas
                obterMarcas = await getData('marca');
                setListaMarca(obterMarcas);
                var encontrarMarca = obterMarcas.find(m => m.ID_marca === obterProduto[0].ID_marca);
                if (encontrarMarca !== null && encontrarMarca !== undefined) {
                    setOpcaoMarca(encontrarMarca);
                }

                validacao.setFieldValue("descricao", obterProduto[0].descricao);
            } catch (error) {

            }

        };
        fecthData();
    }, []);

    const validacao = useFormik({
        initialValues: dados,
        validationSchema: schemaValidacaoProduto,
        onSubmit: (values) => {
            values.valor_uni = converterValor(values.valorUnitario);
            atualizaProduto(values)
            //values.valor_uni = converterValor(values.valorUnitario);
        }
    })

    const atualizaProduto = async (produto: ProdutoPost) => {
        setLoading(true);
        var retorno = await putData('produto', produto);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Produto atualizado com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }


    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            navigate(0);
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }



    return (
        <div>
            <form onSubmit={validacao.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className="titulo-pagina">
                            <p>Editar Produto #{validacao.values.ID_produto}</p>
                        </div>
                    </Grid>
                    <Hidden lgDown>
                        <Grid item lg={6} className="botoes-acao">
                            <div>
                                {BotoesDeAcao("/produtos")}
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        <Divider></Divider>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Paper variant="outlined">
                            <Box p={3}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <p className="titulo-cards">INFORMAÇÕES PARA ESTOQUE</p>
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            id="demo-helper-text-aligned-no-helper"
                                            label={"Código produto"}
                                            name={"ID_produto"}
                                            disabled={true}
                                            onChange={validacao.handleChange}
                                            value={validacao.values.ID_produto}
                                            error={validacao.touched.ID_produto && Boolean(validacao.errors.ID_produto)}
                                            helperText={validacao.touched.ID_produto && validacao.errors.ID_produto}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            id="demo-helper-text-aligned-no-helper"
                                            label={"Nome"}
                                            name={"nome"}
                                            onChange={validacao.handleChange}
                                            value={validacao.values.nome}
                                            error={validacao.touched.nome && Boolean(validacao.errors.nome)}
                                            helperText={validacao.touched.nome && validacao.errors.nome}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            id="min_recomendado"
                                            label={"Quantidade recomendada"}
                                            name={"min_recomendado"}
                                            onChange={validacao.handleChange}
                                            value={validacao.values.min_recomendado}
                                            error={validacao.touched.min_recomendado && Boolean(validacao.errors.min_recomendado)}
                                            helperText={validacao.touched.min_recomendado && validacao.errors.min_recomendado}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                        <Paper variant="outlined">
                            <Box p={3}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <p className="titulo-cards">DETALHES</p>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            fullWidth
                                            id="demo-helper-text-aligned-no-helper"
                                            label={"Peso"}
                                            name={"peso"}
                                            onChange={validacao.handleChange}
                                            value={validacao.values.peso}
                                            error={validacao.touched.peso && Boolean(validacao.errors.peso)}
                                            helperText={validacao.touched.peso && validacao.errors.peso}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            fullWidth
                                            id="demo-helper-text-aligned-no-helper"
                                            label={"Preço"}
                                            name={"valorUnitario"}
                                            value={formatarPrecoReal(validacao.values.valorUnitario)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.valorUnitario && Boolean(validacao.errors.valorUnitario)}
                                            helperText={validacao.touched.valorUnitario && validacao.errors.valorUnitario}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                disablePortal
                                                id="categoria"
                                                options={listaCategoria}
                                                onChange={(event, novoValor) => {
                                                    if (novoValor !== null && novoValor !== undefined) {
                                                        validacao.setFieldValue("FK_categoria", novoValor?.ID_categoria);
                                                        setOpcaoCategoria(novoValor);
                                                    }
                                                }}
                                                inputValue={opcaoCategoria.categoria}
                                                value={opcaoCategoria}
                                                getOptionLabel={(option) => option.categoria ? option.categoria : ""}
                                                isOptionEqualToValue={(option: any, value: any) =>
                                                    option === opcaoCategoria}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        label="Categoria"
                                                        error={validacao.touched.FK_categoria && Boolean(validacao.errors.FK_categoria)}
                                                        helperText={validacao.touched.FK_categoria && validacao.errors.FK_categoria}
                                                    />
                                                }

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                id="marca"
                                                options={listaMarca}
                                                onChange={(event: any, novaOpcao: any) => {
                                                    if (novaOpcao != null) {
                                                        validacao.setFieldValue("FK_marca", novaOpcao.ID_marca);
                                                        setOpcaoMarca(novaOpcao);
                                                    }
                                                }}
                                                value={opcaoMarca}
                                                getOptionLabel={(option) => option.nome_marca}
                                                isOptionEqualToValue={(option: any, value: any) => option.ID_marca === validacao.values.FK_marca}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        label="Marca"
                                                        error={validacao.touched.FK_marca && Boolean(validacao.errors.FK_marca)}
                                                        helperText={validacao.touched.FK_marca && validacao.errors.FK_marca}
                                                    />}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Descrição"
                                            multiline
                                            rows={5}
                                            fullWidth
                                            value={formatarPrecoRealSimbolo(validacao.values.descricao)}
                                            name='descricao'
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.descricao && Boolean(validacao.errors.descricao)}
                                            helperText={validacao.touched.descricao && validacao.errors.descricao}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Hidden lgUp>
                        <Grid item xs={12}>
                            <div
                                className="botoes-acao"
                            >
                                {BotoesDeAcao("/produtos")}
                            </div>
                        </Grid>
                    </Hidden>
                </Grid>

            </form>
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

