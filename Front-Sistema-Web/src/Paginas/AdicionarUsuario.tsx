import { Divider, Grid, Paper, Box, Button } from "@mui/material";
import "../Estilos/Css/Usuarios.css";
import "../Estilos/Css/Customizacao.css";
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from "formik";
import { Cargo, NovoUsuario } from "../Models/ModelUsuario";
import { schemaValidacaoUsuario } from "../Constantes/SchemasDeValidacao";
import { ItemBox } from "../Componentes/ItemBox";
import InformacoesPessoaisUsuario from "../Componentes/Usuarios/InformacoesPessoaisUsuario";
import InformacoesEnderecoUsuario from "../Componentes/Usuarios/InformacoesEnderecoUsuario";
import InformacoesAcessoUsuario from "../Componentes/Usuarios/InformacoesAcessoUsuario";
import { useEffect, useState } from "react";
import { validarCamposEndereco } from "../Utils/Validacoes/Validacoes";
import { getData } from "../Routes/getRoutes";
import { postData } from "../Routes/postRoutes";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IrPara } from "../Utils/Tools";

export default function AdicionarUsuario() {
    const [listaCargo, setListaCargo] = useState([]);
    const [fotoPerfil, setFotoPerfil] = useState("/Imagens/perfil-padrao.jpeg");
    const [fotoArquivo, setFotoArquivo] = useState<File | null>(null)
    const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: false, });  
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [opcaoCargo, setOpcaoCargo] = useState(new Cargo);
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
                const getcargo = await getData('cargo');
                setListaCargo(getcargo);
            } catch (error) { }
        };
        fecthData();
    }, []);

    
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
        initialValues: new NovoUsuario(),
        validationSchema: schemaValidacaoUsuario,
        onSubmit: (values) => {
            validarCamposEndereco(setErros, validacao)
            console.log(values)
            salvarFuncionario(values);
        }
    })

    const salvarFuncionario = async (novfuncionario: NovoUsuario) => {
        setLoading(true);
        const formData = new FormData();
        if (fotoArquivo) {
            formData.append('image', fotoArquivo);

        }        
            formData.append('novfuncionario', JSON.stringify(novfuncionario));
    
        try {
            const retorno = await postData('cadfuncionario', formData);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Funcionario cadastrado com sucesso!", confirmacao: true, abrir: true });
            IrPara("/usuarios");
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
        setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
    }
    }

    return (
        <>
            <Box mb={2}>
                <Grid container>
                    <Grid item lg={6}>
                        <div className="titulo-pagina">
                            <p> <AddIcon /> Adicionar Usuário</p>
                        </div>
                    </Grid>
                    <form onSubmit={validacao.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={5} lg={4}>
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
                                        <InformacoesPessoaisUsuario validacao={validacao} listaCargos={listaCargo} setOpcaoCargo={setOpcaoCargo} opcaoCargo={opcaoCargo}></InformacoesPessoaisUsuario>
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