import { FormControl, Grid, Paper, TextField, Box, Autocomplete, Divider, Hidden } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../Routes/getRoutes";
import { postData } from "../Routes/postRoutes";
import { useNavigate } from "react-router-dom";
import "../Estilos/Css/Customizacao.css";
import 'reactjs-popup/dist/index.css';
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { useFormik } from "formik";
import { ProdutoPost } from "../Interfaces/Produto";
import { schemaValidacaoProduto } from "../Constantes/SchemasDeValidacao";
import { ModelProduto } from "../Models/ModelProduto";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import { formatarPrecoReal, formatarPeso } from "../Utils/Validacoes/Mascaras";
import { converterValor, converterPeso } from "../Utils/Tools";


export default function AdicionarProduto() {
    const [listaCategoria, setListaCategoria] = useState([]);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [listaMarca, setListaMarca] = useState([]);
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
                const getcategoria = await getData('categoria');
                setListaCategoria(getcategoria);
            } catch (error) { }
        };
        fecthData();
    }, []);


    useEffect(() => {
        const fecthData = async () => {
            try {
                const getmarca = await getData('marca');
                setListaMarca(getmarca);
            } catch (error) { }
        };
        fecthData();
    }, []);

    const validacao = useFormik({
        initialValues: new ModelProduto(),
        validationSchema: schemaValidacaoProduto,
        onSubmit: (values) => {
            values.valor_uni = converterValor(values.valorUnitario);
            values.peso = converterPeso(values.pesoConvertido);
            salvarProduto(values);
        }
    })

    const salvarProduto = async (produto: ProdutoPost) => {
        setLoading(true);
        var retorno = await postData('produto', produto);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Produto adicionado com sucesso!", confirmacao: true, abrir: true });
        } else if (retorno === 501) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Código duplicado, coloque outro!", confirmacao: false, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }

    return (
        <div>
            <form onSubmit={validacao.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <div className="titulo-pagina">
                            <p>Adicionar Produto</p>
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
                                    <Grid item xs={12} md={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            id="demo-helper-text-aligned-no-helper"
                                            label={"Nome"}
                                            name={"nome"}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.nome && Boolean(validacao.errors.nome)}
                                            helperText={validacao.touched.nome && validacao.errors.nome}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            id="demo-helper-text-aligned-no-helper"
                                            label={"Código produto"}
                                            name={"ID_produto"}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.ID_produto && Boolean(validacao.errors.ID_produto)}
                                            helperText={validacao.touched.ID_produto && validacao.errors.ID_produto}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <TextField
                                            fullWidth
                                            label={"Quantidade recomendada"}
                                            id="min_recomendado"
                                            name={"min_recomendado"}
                                            onChange={validacao.handleChange}
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
                                            name={"pesoConvertido"}
                                            value={formatarPeso(validacao.values.pesoConvertido)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.pesoConvertido && Boolean(validacao.errors.pesoConvertido)}
                                            helperText={validacao.touched.pesoConvertido && validacao.errors.pesoConvertido}
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
                                                onChange={(event: any, novaOpcao: any) => {
                                                    if (novaOpcao != null) {
                                                        validacao.setFieldValue("FK_categoria", novaOpcao.ID_categoria);
                                                    }
                                                }}

                                                getOptionLabel={(option: any) => option.categoria}
                                                isOptionEqualToValue={(option: any, value: any) => option.ID_categoria === value.ID_categoria}
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
                                                    }

                                                }}
                                                getOptionLabel={(option: any) => option.nome_marca}
                                                isOptionEqualToValue={(option: any, value: any) => option.ID_marca === value.ID_marca}
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
                            <div className="botoes-acao">
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
    );
}

