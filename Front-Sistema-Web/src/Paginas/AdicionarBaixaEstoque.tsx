import { Box, Divider, FormControl, Grid, Hidden, Paper, TextField, Autocomplete } from "@mui/material";
import { schemaValidacaoBaixaEstoque } from "../Constantes/SchemasDeValidacao";
import { ItemProduto, ModelBaixaEstoque } from "../Models/ModelProduto";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { getData } from "../Routes/getRoutes";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import { store } from "../store/store";
import { Venda, Baixa } from "../Models/ModelVenda";
import { postData } from "../Routes/postRoutes";
import { Produto } from "../Interfaces/Produto";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { useNavigate } from "react-router";


export default function AdicionarBaixaEstoque() {
    const [listaProd, setListaProd] = useState(new Array<ItemProduto>());
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const [etapaAtiva, setEtapaAtiva] = React.useState(0);
    const [baixa, setVenda] = useState(new Baixa());
    const navigate = useNavigate();

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


    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            navigate(0);
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    const validacao = useFormik({
        initialValues: new ModelBaixaEstoque(),
        validationSchema: schemaValidacaoBaixaEstoque,
        onSubmit: (values) => {
            console.log(values)
            values.ID_funcionario = store.getState().autenticar.idUsuario;
            cadastrarBaixa(values)
        }
    })

    const cadastrarBaixa = async (baixa: any) => {
        var baixas = new Baixa();
       // baixas.funcionarioId = store.getState().autenticar.idUsuario;

        var produto: Produto;
        produto = {
            ID_produto: baixa.ID_produto,
            desconto: 0,
            nome: baixa.nome,
            quantidade: baixa.quantidade,
            valor_total: 0,
            valor_uni: 0
        }
        baixas.listaProdutos.push(produto);
        baixas.justificativa = baixa.justificativa;
        baixas.funcionarioId = store.getState().autenticar.idUsuario;
           setLoading(true);
          var retorno = await postData('baixa', baixas);
          if (retorno === 200) {
              setLoading(false);
              setModalConfirmacao({ mensagem: "Baixa feita com sucesso!", confirmacao: true, abrir: true });
          } else {
              setLoading(false);
              setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
          }

    }

    return (
        <>
            <form onSubmit={validacao.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <h2>
                            Cadastrar baixa no estoque
                        </h2>
                    </Grid>
                    <Hidden lgDown>
                        <Grid item lg={6} className="botoes-acao">
                            <div>
                                {BotoesDeAcao("/baixanoestoque")}
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        <Divider></Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper variant="outlined">
                            <Box p={3}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} lg={7}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                disablePortal
                                                id="produto"
                                                options={listaProd}
                                                onChange={(event: any, novaOpcao: any) => {
                                                    if (novaOpcao != null) {
                                                        validacao.setFieldValue("ID_produto", novaOpcao.ID_produto);
                                                        validacao.setFieldValue("nome", novaOpcao.nome);
                                                    }
                                                }}
                                                getOptionLabel={(option: any) => option.nome}
                                                isOptionEqualToValue={(option: any, value: any) => option.ID_produto === value.ID_produto}
                                                renderInput={(params) =>
                                                    <TextField {...params}
                                                        label="Produto"
                                                        error={validacao.touched.ID_produto && Boolean(validacao.errors.ID_produto)}
                                                        helperText={validacao.touched.ID_produto && validacao.errors.ID_produto}
                                                    />
                                                }

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={5}>
                                        <TextField
                                            fullWidth
                                            id="campoQuantidade"
                                            label={"Quantidade"}
                                            name={"quantidade"}
                                            type={"number"}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.quantidade && Boolean(validacao.errors.quantidade)}
                                            helperText={validacao.touched.quantidade && validacao.errors.quantidade}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoJustificativa"
                                            label={"Justificativa"}
                                            name={"justificativa"}
                                            type={"text"}
                                            multiline
                                            rows={5}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.justificativa && Boolean(validacao.errors.justificativa)}
                                            helperText={validacao.touched.justificativa && validacao.errors.justificativa}
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
                                {BotoesDeAcao("/baixanoestoque")}
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

        </>
    );
}

