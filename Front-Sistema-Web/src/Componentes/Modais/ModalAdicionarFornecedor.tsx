import Button from '@mui/material/Button';
import { useStyles } from '../../Estilos/MakeStyles/StylesSite';
import { Box, Dialog, DialogActions, DialogContent, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import ModalEnvioConfirmado from './ModalEnvioConfirmado';
import ModalLoading from './ModalLoading';
import { useFormik } from 'formik';
import { ModelFornecedor } from '../../Models/ModelFornecedor';
import { schemaValidacaoFornecedor } from '../../Constantes/SchemasDeValidacao';
import { formatarCnpj, mascaraTelefone } from '../../Utils/Validacoes/Mascaras';
import ModalHeader from './ModalHeader';
import { buscarCep, validarCamposEndereco } from "../../Utils/Validacoes/Validacoes";
import { postData } from '../../Routes/postRoutes';

export default function ModalAdicionarFornecedor(props: any) {

    const classes = useStyles();
    const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: false, });
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);

    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            window.location.reload();
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    const validacao = useFormik({
        initialValues: new ModelFornecedor(),
        validationSchema: schemaValidacaoFornecedor,
        onSubmit: (values) => {
            salvarFornecedor(values);
        },
    })


    const salvarFornecedor = async (fornecedor: any) => {
        setLoading(true);
        var retorno = await postData("cadfornecedor", fornecedor);

        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Fornecedor cadastrado com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }


    return (
        <>
            <Dialog
                className={classes.modalEspacamento}
                open={props.adicionarFornecedor}
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ModalHeader titulo={"Adicionar Fornecedor"} fecharModal={props.fecharModal} />
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Box mb={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} lg={5}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"CNPJ"}
                                        name={"cnpj"}
                                        value={formatarCnpj(validacao.values.cnpj)}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.cnpj && Boolean(validacao.errors.cnpj)}
                                        helperText={validacao.touched.cnpj && validacao.errors.cnpj}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={7}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Razão Social"}
                                        name={"razao_social"}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.razao_social && Boolean(validacao.errors.razao_social)}
                                        helperText={validacao.touched.razao_social && validacao.errors.razao_social}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={7}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"E-mail"}
                                        name={"email"}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.email && Boolean(validacao.errors.email)}
                                        helperText={validacao.touched.email && validacao.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={5}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Telefone"}
                                        name={"telefone"}
                                        value={mascaraTelefone(validacao.values.telefone)}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.telefone && Boolean(validacao.errors.telefone)}
                                        helperText={validacao.touched.telefone && validacao.errors.telefone}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} lg={4}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"CEP"}
                                        name={"cep"}
                                        inputProps={{ maxLength: 9 }}
                                        value={validacao.values.cep}
                                        onChange={(e) => buscarCep(e.target.value, validacao, setErros)}
                                        error={validacao.touched.cep && Boolean(validacao.errors.cep)}
                                        helperText={validacao.touched.cep && validacao.errors.cep}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"UF"}
                                        name={"uf"}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={validacao.values.uf}
                                        onChange={validacao.handleChange}
                                        error={erros.uf}
                                        helperText={erros.uf ? "O campo é obrigatório" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Cidade"}
                                        name={"cidade"}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={validacao.values.cidade}
                                        onChange={validacao.handleChange}
                                        error={erros.cidade}
                                        helperText={erros.cidade ? "O campo é obrigatório" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Rua"}
                                        name={"rua"}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={validacao.values.rua}
                                        onChange={validacao.handleChange}
                                        error={erros.rua}
                                        helperText={erros.rua ? "O campo é obrigatório" : ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Bairro"}
                                        name={"bairro"}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={validacao.values.bairro}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.bairro && Boolean(validacao.errors.bairro)}
                                        helperText={validacao.touched.bairro && validacao.errors.bairro}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} lg={2}>
                                    <TextField
                                        fullWidth
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Numero"}
                                        name={"numero"}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.numero && Boolean(validacao.errors.numero)}
                                        helperText={validacao.touched.numero && validacao.errors.numero}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={10} lg={10}>
                                    <TextField
                                        fullWidth
                                        helperText=""
                                        id="demo-helper-text-aligned-no-helper"
                                        label={"Referencia"}
                                        name={"referencia"}
                                        onChange={validacao.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={() => validarCamposEndereco(setErros, validacao)} autoFocus>
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
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