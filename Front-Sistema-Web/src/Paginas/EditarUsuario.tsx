import { Divider, Grid, Paper, Box } from "@mui/material";
import "../Estilos/Css/Usuarios.css";
import "../Estilos/Css/Customizacao.css";
import { useFormik } from "formik";
import { Cargo, EditarFuncionario } from "../Models/ModelUsuario";
import { schemaValidacaoUsuario } from "../Constantes/SchemasDeValidacao";
import { ItemBox } from "../Componentes/ItemBox";
import InformacoesPessoaisUsuario from "../Componentes/Usuarios/InformacoesPessoaisUsuario";
import InformacoesEnderecoUsuario from "../Componentes/Usuarios/InformacoesEnderecoUsuario";
import InformacoesAcessoUsuario from "../Componentes/Usuarios/InformacoesAcessoUsuario";
import { useEffect, useState } from "react";
import { validarCamposEndereco } from "../Utils/Validacoes/Validacoes";
import { getData, getDataEdit } from "../Routes/getRoutes";
import { postData } from "../Routes/postRoutes";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { useNavigate, useParams } from "react-router-dom";
import { putData } from "../Routes/putRoutes";

export default function EditarUsuario() {
    const [listaCargos, setListaCargos] = useState([]);
    const [fotoPerfil, setFotoPerfil] = useState("/Imagens/perfil-padrao.jpeg");
    const [fotoArquivo, setFotoArquivo] = useState<File | null>(null)
    const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: false, });
    const [opcaoCargo, setOpcaoCargo] = useState(new Cargo);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            navigate(0);
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    const trocarImagem = (imagem: any) => {
        if (imagem.target.files[0]) {
            const file = imagem.target.files?.[0]; // Obtém o primeiro arquivo selecionado
            setFotoArquivo(file);

            const reader = new FileReader();
            reader.readAsDataURL(imagem.target.files[0]);
            reader.onload = function () {
                var base64 = reader.result;
                if (base64 !== null) {
                    setFotoPerfil(base64?.toString());
                }
            }
        };
    }

    const validacao = useFormik({
        initialValues: new EditarFuncionario(),
        validationSchema: schemaValidacaoUsuario,
        onSubmit: (values) => {
            validarCamposEndereco(setErros, validacao)
            console.log(values)
            salvarFuncionario(values);
        }
    })

    useEffect(() => {
        const fecthData = async () => {
            try {
                var dadosPerfil = await getDataEdit('funcionarioEdit', id);
                validacao.setFieldValue("ID_pessoa", dadosPerfil[0].ID_pessoa);
                validacao.setFieldValue("ID_funcionario", dadosPerfil[0].ID_funcionario);
                validacao.setFieldValue("nome", dadosPerfil[0].nome);
                validacao.setFieldValue("sobrenome", dadosPerfil[0].sobrenome);
                validacao.setFieldValue("cpf", dadosPerfil[0].cpf);
                validacao.setFieldValue("email", dadosPerfil[0].email);
                validacao.setFieldValue("celular", dadosPerfil[0].celular);
                validacao.setFieldValue("login", dadosPerfil[0].login);
                validacao.setFieldValue("senha", dadosPerfil[0].senha);
                validacao.setFieldValue("nivelDeAcesso", dadosPerfil[0].nivel_acesso);
                var endereco = JSON.parse(dadosPerfil[0].enderecos);
                validacao.setFieldValue("bairro", endereco[0].bairro);
                validacao.setFieldValue("cep", endereco[0].cep);
                validacao.setFieldValue("cidade", endereco[0].cidade);
                validacao.setFieldValue("complemento", endereco[0].complemento);
                validacao.setFieldValue("numero", endereco[0].numero);
                validacao.setFieldValue("uf", endereco[0].uf);
                validacao.setFieldValue("rua", endereco[0].rua);
                const getCargos = await getData('cargo');
                setListaCargos(getCargos);
                var encontrarCargo = getCargos.find((c: any) => c.ID_cargo === dadosPerfil[0].ID_cargo);
                if (encontrarCargo !== null && encontrarCargo !== undefined) {
                    setOpcaoCargo(encontrarCargo);
                }
                
                validacao.setFieldValue("referencia", endereco[0].referencia);

                if(dadosPerfil[0].img_perfil){
                    setFotoPerfil(`/Imagens/Usuarios/${dadosPerfil[0].img_perfil}`);
                }

            } catch (error) {

            }
        };
        fecthData();
    }, []);


    const salvarFuncionario = async (novfuncionario: EditarFuncionario) => {
        setLoading(true);
        const formData = new FormData();
        if (fotoArquivo) {
            formData.append('image', fotoArquivo);
        }        
            formData.append('novfuncionario', JSON.stringify(novfuncionario));

        var retorno = await putData('funcionario', formData);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Funcionario editado com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }

    return (
        <>
            <Box mb={2}>
                <Grid container>
                    <Grid item lg={6}>
                        <div className="titulo-pagina">
                            <p>Editar Usuário</p>
                        </div>
                    </Grid>
                    <form onSubmit={validacao.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={4}>
                                <Paper variant="outlined">
                                    <div className="espacamento-interno-box">
                                        <img className="avatar" alt="Foto de perfil" src={fotoPerfil}></img>
                                        <div className="adicionar-imagem">
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="carregar-foto"
                                                multiple
                                                type="file"
                                                onChange={(e) => trocarImagem(e)}
                                            />
                                            <label htmlFor="carregar-foto">
                                                (opcional) Foto de Perfil +
                                            </label>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item lg={8} xs={12} md={7}>
                                <Paper variant="outlined">
                                    <div className="espacamento-interno-box">
                                        <InformacoesPessoaisUsuario validacao={validacao} listaCargos={listaCargos} setOpcaoCargo={setOpcaoCargo} opcaoCargo={opcaoCargo}></InformacoesPessoaisUsuario>
                                        <Box pb={4} pt={4}>
                                            <Divider></Divider>
                                        </Box>
                                        <InformacoesEnderecoUsuario validacao={validacao} erros={erros} setErros={setErros}></InformacoesEnderecoUsuario>
                                        <Box pb={4} pt={4}>
                                            <Divider></Divider>
                                        </Box>
                                        <InformacoesAcessoUsuario validacao={validacao}></InformacoesAcessoUsuario>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box display={"flex"} justifyContent={"flex-end"}>
                                                    <ItemBox>
                                                        <div className="botoes-acao">
                                                            {BotoesDeAcao("/usuarios")}
                                                        </div>
                                                    </ItemBox>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </form>
                    <ModalEnvioConfirmado
                        mensagem={modalConfirmacao.mensagem}
                        abrir={modalConfirmacao.abrir}
                        confirmacao={modalConfirmacao.confirmacao}
                        fecharModal={fecharModal}
                    ></ModalEnvioConfirmado>
                    <ModalLoading abrir={ativarLoading}></ModalLoading>
                </Grid>
            </Box >

        </>
    );
}