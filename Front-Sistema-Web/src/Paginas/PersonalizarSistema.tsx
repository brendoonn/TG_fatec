import { Box, Divider, Grid, Paper, TextField, Typography, Hidden } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from "react";
import "../Estilos/Css/PersonalizarSistema.css";
import { useFormik } from "formik";
import { Personalizacao } from "../Models/ModelPersonalizacao";
import { schemaValidacaoConfiguracao } from "../Constantes/SchemasDeValidacao";
import { formatarCnpj, formatarDataParaEstiloBrasileiro, mascaraData, mascaraTelefone } from "../Utils/Validacoes/Mascaras";
import { buscarCep, validarCamposEndereco } from '../Utils/Validacoes/Validacoes';
import SendIcon from '@mui/icons-material/Send';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { IrPara, carregarImagemPersonalizacao, exibeImagemPersonalizacao, montarDadosEmpresa } from "../Utils/Tools";
import { getData, getDataEdit } from "../Routes/getRoutes";
import { empresa } from "../Interfaces/Empresa";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { postData } from "../Routes/postRoutes";
import { useNavigate } from "react-router";
import { putData } from "../Routes/putRoutes";
import axios from "axios";
import { armazenar } from "../features/TemaSistema/tema-slice";
import { useDispatch } from "react-redux";

export default function PersonalizarSistema() {
    const [imagemEscura, setImagemEscura] = useState("");
    const [fileImagemEscura, setFileImagemEscura] = useState<File | null>(null);
    const [imagemClara, setImagemClara] = useState("");
    const [fileImagemClara, setFileImagemClara] = useState<File | null>(null);
    const [fundoDesktop, setFundoDesktop] = useState("");
    const [fileFundoDesktop, setFileFundoDesktop] = useState<File | null>(null);
    const [acao, setAcao] = useState('novo');
    const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: '', });
    const [ativarLoading, setLoading] = useState(false);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const BotoesAcao = (url: any) => {
        return (
            <>
                <button className="botao-cancelar" onClick={() => IrPara(url)}>
                    <DoDisturbIcon /> Cancelar
                </button>
                <button className="botao-salvar" type="submit" onClick={() => validarCamposEndereco(setErros, validacao)}>
                    <SendIcon /> Salvar
                </button>
            </>
        )
    }


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
                var dadosEmpresa = await getData('empresa');
                if (dadosEmpresa.length > 0) {
                    validacao.setFieldValue("cnpj", dadosEmpresa[0].emp_cnpj);
                    validacao.setFieldValue("nome_empresarial", dadosEmpresa[0].emp_nome);
                    validacao.setFieldValue("nome_fantasia", dadosEmpresa[0].emp_nome_fantasia);
                    validacao.setFieldValue("telefone", dadosEmpresa[0].emp_telefone);
                    var data = dadosEmpresa[0].emp_data;
                    data = formatarDataParaEstiloBrasileiro(data);
                    validacao.setFieldValue("data_abertura", data);
                    validacao.setFieldValue("rua", dadosEmpresa[0].emp_logradouro);
                    validacao.setFieldValue("numero", dadosEmpresa[0].emp_numero);
                    validacao.setFieldValue("complemento", dadosEmpresa[0].emp_complemento);
                    validacao.setFieldValue("cep", dadosEmpresa[0].emp_cep);
                    validacao.setFieldValue("bairro", dadosEmpresa[0].emp_bairro);
                    validacao.setFieldValue("cidade", dadosEmpresa[0].emp_municipio);
                    validacao.setFieldValue("uf", dadosEmpresa[0].emp_uf);
                    validacao.setFieldValue("emp_imagem", dadosEmpresa[0].emp_imagem);
                    validacao.setFieldValue("inscricao_estadual", dadosEmpresa[0].emp_ie);
                    validacao.setFieldValue("inscricao_municipal", dadosEmpresa[0].emp_im);
                    validacao.setFieldValue("ID_empresa", dadosEmpresa[0].ID_empresa);

                    var logoClaro = dadosEmpresa[0].emp_logomarca_claro ? dadosEmpresa[0].emp_logomarca_claro : "";
                    var logoEscuro =dadosEmpresa[0].emp_logomarca_escuro ? dadosEmpresa[0].emp_logomarca_escuro : "";
                    var imagemDesktop = dadosEmpresa[0].emp_imagem ? dadosEmpresa[0].emp_imagem : "";

                    validacao.setFieldValue("logomarca_claro", logoClaro);
                    validacao.setFieldValue("logomarca_escuro", logoEscuro);

                    if(logoClaro){
                    setImagemClara(`/Imagens/Sistema/${logoClaro}`);
                    }
                    if(logoEscuro){
                        setImagemEscura(`/Imagens/Sistema/${logoEscuro}`);
                    }
                    if(imagemDesktop){
                        setFundoDesktop(`/Imagens/Sistema/${imagemDesktop}`);
                    }
                    dispatch(armazenar({
                        logoEscuro: logoEscuro,
                        logoClaro: logoClaro
                    }));
                    setAcao("veio")
                } else {
                };
            } catch (error) { }
        };
        fecthData();
    }, []);


    const validacao = useFormik({
        initialValues: new Personalizacao(),
        validationSchema: schemaValidacaoConfiguracao,
        onSubmit: (values) => {
            if (acao === 'novo') {
                var informacoesEmpresa = montarDadosEmpresa(values);
                salvarDados(informacoesEmpresa);
            } else {
                var informacoesEmpresa = montarDadosEmpresa(values);
                editarDados(informacoesEmpresa);
            }
        }
    })

    const salvarDados = async (novEmpresa: empresa) => {
        setLoading(true);
        const formData = new FormData();
        if (fileImagemEscura) {
            formData.append('image', fileImagemEscura);
        }
        if (fileImagemClara) {
            formData.append('image', fileImagemClara);
        }
        if (fileFundoDesktop) {
            formData.append('image', fileFundoDesktop);
        }
        formData.append('novEmpresa', JSON.stringify(novEmpresa));

        var retorno = await postData('empresa', formData);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Empresa adicionada com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }

    const editarDados = async (novEmpresa: empresa) => {
        setLoading(true);
        const formData = new FormData();
        if (fileImagemEscura) {
            formData.append('image', fileImagemEscura);
            novEmpresa.emp_logomarca_escuro = "";
        }
        if (fileImagemClara) {
            formData.append('image', fileImagemClara);
            novEmpresa.emp_logomarca_claro = "";

        }
        if (fileFundoDesktop) {
            formData.append('image', fileFundoDesktop);
            novEmpresa.emp_imagem = "";
        }
        formData.append('novEmpresa', JSON.stringify(novEmpresa));    

        var retorno = await putData('editEmpresa', formData);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Empresa atualizada com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }


    return (
        <form onSubmit={validacao.handleSubmit}>
            <Grid container spacing={2}>
                <Hidden lgDown>
                    <Grid item lg={12} className="botoes-acao">
                        <div>
                            {BotoesAcao("/")}
                        </div>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2}>
                        <Box p={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="secondary">INFORMAÇÕES DA EMPRESA</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="CNPJ"
                                        name="cnpj"
                                        inputProps={{ maxLength: 18 }}
                                        value={formatarCnpj(validacao.values.cnpj)}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.cnpj && Boolean(validacao.errors.cnpj)}
                                        helperText={validacao.touched.cnpj && validacao.errors.cnpj}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="inscricao_estadual"
                                        label="Inscrição Estadual"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.inscricao_estadual}
                                        error={validacao.touched.inscricao_estadual && Boolean(validacao.errors.inscricao_estadual)}
                                        helperText={validacao.touched.inscricao_estadual && validacao.errors.inscricao_estadual}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Inscrição Municipal"
                                        name="inscricao_municipal"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.inscricao_municipal}
                                        error={validacao.touched.inscricao_municipal && Boolean(validacao.errors.inscricao_municipal)}
                                        helperText={validacao.touched.inscricao_municipal && validacao.errors.inscricao_municipal}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Nome Empresarial"
                                        name="nome_empresarial"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.nome_empresarial}
                                        error={validacao.touched.nome_empresarial && Boolean(validacao.errors.nome_empresarial)}
                                        helperText={validacao.touched.nome_empresarial && validacao.errors.nome_empresarial}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Nome Fantasia" name="nome_fantasia"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.nome_fantasia}
                                        error={validacao.touched.nome_fantasia && Boolean(validacao.errors.nome_fantasia)}
                                        helperText={validacao.touched.nome_fantasia && validacao.errors.nome_fantasia}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Data de abertura"
                                        name="data_abertura"
                                        onChange={validacao.handleChange}
                                        value={mascaraData(validacao.values.data_abertura)}
                                        error={validacao.touched.data_abertura && Boolean(validacao.errors.data_abertura)}
                                        helperText={validacao.touched.data_abertura && validacao.errors.data_abertura}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="CEP"
                                        name="cep"
                                        inputProps={{ maxLength: 9 }}
                                        onChange={(e) => buscarCep(e.target.value, validacao, setErros)}
                                        value={validacao.values.cep}
                                        error={validacao.touched.cep && Boolean(validacao.errors.cep)}
                                        helperText={validacao.touched.cep && validacao.errors.cep}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="UF"
                                        name="uf"
                                        inputProps={{ maxLength: 2 }}
                                        onChange={validacao.handleChange}
                                        value={validacao.values.uf}
                                        error={erros.uf}
                                        helperText={erros.uf ? "O campo é obrigatório" : ""}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Cidade"
                                        name="cidade"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.cidade}
                                        error={erros.cidade}
                                        helperText={erros.cidade ? "O campo é obrigatório" : ""}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Rua"
                                        name="rua"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.rua}
                                        error={erros.rua}
                                        helperText={erros.rua ? "O campo é obrigatório" : ""}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Bairro"
                                        name="bairro"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.bairro}
                                        error={validacao.touched.bairro && Boolean(validacao.errors.bairro)}
                                        helperText={validacao.touched.bairro && validacao.errors.bairro}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Número"
                                        name="numero"
                                        onChange={validacao.handleChange}
                                        value={validacao.values.numero}
                                        error={validacao.touched.numero && Boolean(validacao.errors.numero)}
                                        helperText={validacao.touched.numero && validacao.errors.numero}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Complemento"
                                        name="complemento"
                                        value={validacao.values.complemento}
                                        onChange={validacao.handleChange}
                                        variant="standard" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                        label="Telefone"
                                        name="telefone"
                                        value={mascaraTelefone(validacao.values.telefone)}
                                        onChange={validacao.handleChange}
                                        error={validacao.touched.telefone && Boolean(validacao.errors.telefone)}
                                        helperText={validacao.touched.telefone && validacao.errors.telefone}
                                        variant="standard" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={2}>
                                <Box p={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} order={{ xs: 1 }}>
                                            <Typography variant="h6" color="secondary">LOGO ESCURO</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6} order={{ xs: 3, lg: 2, md: 2, sm: 3 }}>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="carregar-logo1"
                                                multiple
                                                type="file"
                                                onChange={(e) => carregarImagemPersonalizacao(e, setImagemEscura, setFileImagemEscura)}
                                            />
                                            <label htmlFor="carregar-logo1">
                                                <div className="paper-imagem-logo ">
                                                    {exibeImagemPersonalizacao(imagemEscura, validacao.values.logomarca_escuro) ?
                                                        <img src={imagemEscura} alt={"Logo"} className="imagem-upload-logo"></img>
                                                        : <AddPhotoAlternateIcon sx={{
                                                            cursor: "pointer",
                                                            fontSize: "5rem",
                                                            margin: "auto"
                                                        }} />}
                                                </div>
                                            </label>
                                            <Typography variant="subtitle1" color={"secondary"}>Logo da empresa</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={2}>
                                <Box p={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} order={{ xs: 1 }}>
                                            <Typography variant="h6" color="secondary">LOGO CLARO</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6} order={{ xs: 3, lg: 2, md: 2, sm: 3 }}>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="carregar-logo2"
                                                multiple
                                                type="file"
                                                onChange={(e) => carregarImagemPersonalizacao(e, setImagemClara, setFileImagemClara)}
                                            />
                                            <label htmlFor="carregar-logo2">
                                                <div className="paper-imagem-logo ">
                                                    {exibeImagemPersonalizacao(imagemClara, validacao.values.logomarca_claro)  ?
                                                        <img src={imagemClara} alt={"Logo"} className="imagem-upload-logo"></img>
                                                        : <AddPhotoAlternateIcon sx={{
                                                            cursor: "pointer",
                                                            fontSize: "5rem",
                                                            margin: "auto"
                                                        }} />}
                                                </div>
                                            </label>
                                            <Typography variant="subtitle1" color={"secondary"}>Logo da empresa</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={2}>
                                <Box p={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} order={{ xs: 1 }}>
                                            <Typography variant="h6" color="secondary">Fundo Desktop</Typography>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={6} order={{ xs: 3, lg: 2, md: 2, sm: 3 }}>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="carregar-logo3"
                                                multiple
                                                type="file"
                                                onChange={(e) => carregarImagemPersonalizacao(e, setFundoDesktop, setFileFundoDesktop)}
                                            />
                                            <label htmlFor="carregar-logo3">
                                                <div className="paper-imagem-logo ">
                                                    {exibeImagemPersonalizacao(fundoDesktop, validacao.values.emp_imagem) ?
                                                        <img src={fundoDesktop} alt={"fundo-desktop"} className="imagem-upload-logo"></img>
                                                        : <AddPhotoAlternateIcon sx={{
                                                            cursor: "pointer",
                                                            fontSize: "5rem",
                                                            margin: "auto"
                                                        }} />}
                                                </div>
                                            </label>
                                            <Typography variant="subtitle1" color={"secondary"}>Fundo desktop</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden lgUp>
                    <Grid item xs={12}>
                        <div
                            className="alinhar-fim"
                        >
                            {BotoesAcao("/")}
                        </div>
                    </Grid>
                </Hidden>
            </Grid>
            <ModalEnvioConfirmado
                mensagem={modalConfirmacao.mensagem}
                abrir={modalConfirmacao.abrir}
                confirmacao={modalConfirmacao.confirmacao}
                fecharModal={fecharModal}
            ></ModalEnvioConfirmado>
            <ModalLoading abrir={ativarLoading}></ModalLoading>

        </form>
    );
}
