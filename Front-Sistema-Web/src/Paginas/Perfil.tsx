import { Divider, Grid, Paper, Box, Button } from "@mui/material";
import "../Estilos/Css/Usuarios.css";
import "../Estilos/Css/Customizacao.css";
import { useFormik } from "formik";
import { Cargo, EditarFuncionario, EditarLogin, EditarUsuario } from "../Models/ModelUsuario";
import { schemaValidacaoAlterarSenha, schemaValidacaoEditarPerfil } from "../Constantes/SchemasDeValidacao";
import { ItemBox } from "../Componentes/ItemBox";
import InformacoesPessoaisUsuario from "../Componentes/Usuarios/InformacoesPessoaisUsuario";
import InformacoesEnderecoUsuario from "../Componentes/Usuarios/InformacoesEnderecoUsuario";
import { useEffect, useState } from "react";
import { validarCamposEndereco } from "../Utils/Validacoes/Validacoes";
import AlterarSenha from "../Componentes/Usuarios/AlterarSenha";
import ImagemDePerfil from "../Componentes/Usuarios/ImagemDePerfil";
import MenuPerfil from "../Componentes/Usuarios/MenuPerfil";
import { getData, getDataEdit } from "../Routes/getRoutes";
import { useAppSelector } from "../Hooks/useAppSelector";
import { putData } from "../Routes/putRoutes";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { useNavigate, useParams } from "react-router-dom";

export default function Perfil() {
    const [listaCargos, setListaCargos] = useState(new Array<Cargo>);
    const [fotoPerfil, setFotoPerfil] = useState("/Imagens/perfil-padrao.jpeg");
    const [fotoArquivo, setFotoArquivo] = useState<File | null>(null)
    const [trocarPaper, setTrocarPaper] = useState(false);
    const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: false, });
    const [opcaoCargo, setOpcaoCargo] = useState(new Cargo);
    const idUsuario = useAppSelector((state) => state.autenticar).idUsuario;
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validacao = useFormik({
        initialValues: new EditarFuncionario(),
        validationSchema: schemaValidacaoEditarPerfil,
        onSubmit: (values) => {
            editarDados(values);
        }

    })

    const validacaoLogin = useFormik({
        initialValues: new EditarLogin(),
        validationSchema: schemaValidacaoAlterarSenha,
        onSubmit: (values) => {
            validacao.values.senha = values.novaSenha;
            editarDados(validacao.values);
        }
    })

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
                var dadosPerfil = await getDataEdit('funcionarioEdit', idUsuario);
                validacao.setFieldValue("nome", dadosPerfil[0].nome);
                validacao.setFieldValue("sobrenome", dadosPerfil[0].sobrenome);
                validacao.setFieldValue("cpf", dadosPerfil[0].cpf);
                validacao.setFieldValue("email", dadosPerfil[0].email);
                validacao.setFieldValue("celular", dadosPerfil[0].celular);

                var endereco = JSON.parse(dadosPerfil[0].enderecos);
                validacao.setFieldValue("bairro", endereco[0].bairro);
                validacao.setFieldValue("cep", endereco[0].cep);
                validacao.setFieldValue("cidade", endereco[0].cidade);
                validacao.setFieldValue("complemento", endereco[0].complemento);
                validacao.setFieldValue("numero", endereco[0].numero);
                validacao.setFieldValue("uf", endereco[0].uf);
                validacao.setFieldValue("rua", endereco[0].rua);
                validacao.setFieldValue("referencia", endereco[0].referencia);
                validacao.setFieldValue("ID_pessoa", dadosPerfil[0].ID_pessoa);
                validacao.setFieldValue("ID_funcionario", dadosPerfil[0].ID_funcionario);
                validacao.setFieldValue("login", dadosPerfil[0].login);
                validacao.setFieldValue("senha", dadosPerfil[0].senha);
                validacao.setFieldValue("nivelDeAcesso", dadosPerfil[0].nivel_acesso);
                
                const getCargos = await getData('cargo');
                setListaCargos(getCargos);
                var encontrarCargo = getCargos.find((c: any) => c.ID_cargo === dadosPerfil[0].ID_cargo);
                if (encontrarCargo !== null && encontrarCargo !== undefined) {
                    setOpcaoCargo(encontrarCargo);
                }

            } catch (error) {

            }
        };
        fecthData();
    }, []);

    const editarDados = async (novfuncionario: EditarFuncionario) => {
        setLoading(true);
        const formData = new FormData();
        if (fotoArquivo) {
            formData.append('image', fotoArquivo);
        }
        formData.append('novfuncionario', JSON.stringify(novfuncionario));

        var retorno = await putData('funcionario', formData);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Informações atualizadas com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }

    return (
        <>
            <form onSubmit={!trocarPaper ? validacao.handleSubmit : validacaoLogin.handleSubmit}>
                <Box mb={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="titulo-pagina">
                                <p> Meu perfil</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} lg={12}>
                                    <ImagemDePerfil fotoPerfil={fotoPerfil} setFotoArquivo={setFotoArquivo} setFotoPerfil={setFotoPerfil}></ImagemDePerfil>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={12}>
                                    <MenuPerfil setTrocarPaper={setTrocarPaper}></MenuPerfil>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <Grid container>
                                <Grid xs={12} >
                                    {!trocarPaper ?
                                        <Paper variant="outlined">
                                            <div className="espacamento-interno-box">
                                                <InformacoesPessoaisUsuario
                                                    validacao={validacao}
                                                    listaCargos={listaCargos}
                                                    setOpcaoCargo={setOpcaoCargo}
                                                    opcaoCargo={opcaoCargo}></InformacoesPessoaisUsuario>
                                                <Box pb={4} pt={4}>
                                                    <Divider></Divider>
                                                </Box>
                                                <InformacoesEnderecoUsuario validacao={validacao} erros={erros} setErros={setErros}></InformacoesEnderecoUsuario>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Box display={"flex"} justifyContent={"flex-end"}>
                                                            <ItemBox>
                                                                <Button variant="contained" onClick={() => validarCamposEndereco(setErros, validacao)} type="submit">Salvar</Button>
                                                            </ItemBox>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Paper> :

                                        <Paper variant="outlined">
                                            <div className="espacamento-interno-box">
                                                <AlterarSenha validacao={validacaoLogin}></AlterarSenha>
                                            </div>
                                        </Paper>
                                    }
                                </Grid>
                            </Grid>
                        </Grid >
                    </Grid>
                </Box >
            </form >
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