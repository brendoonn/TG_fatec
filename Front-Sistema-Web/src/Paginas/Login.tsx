import { Alert, Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { logar } from "../features/Autenticacao/autenticacao-slice";
import { IrPara, verificarDisponibilidadeDeImagens } from "../Utils/Tools";
import "../Estilos/Css/login.css";
import "../Estilos/Css/Customizacao.css";
import { useState } from "react";
import { themeComponents } from "../Tema/theme";
import { getLogin } from "../Routes/getLogins";
import { useFormik } from "formik";
import { ModelLogin } from "../Models/ModelLogin";
import { schemaValidacaoLogar } from "../Constantes/SchemasDeValidacao";
import { useAppSelector } from "../Hooks/useAppSelector";


export default function Login() {
    const useTema = themeComponents(localStorage.getItem("USER_THEME"));
    const temaSistema = useAppSelector((state) => state.definirTema);
    const dispatch = useDispatch();
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(false);

    const validacao = useFormik({
        initialValues: new ModelLogin(),
        validationSchema: schemaValidacaoLogar,
        onSubmit: (values) => {
            fazerLogin(validacao);
        }
    })

    const fazerLogin = async (validacaoLogin: any) => {
        setLoading(true);
        const res = await verificaCredenciais(validacaoLogin);
        if (res !== false) {
            dispatch(logar({
                nomeUsuario: res.nome,
                nivelAcesso: res.nivel_acesso,
                idUsuario: res.ID_funcionario,
                logado: true
            }));
            IrPara("/");
        } else {
            setErro(true);
        }
        setLoading(false);

    }

    const verificaCredenciais = async (validacaoLogin: any) => {
        var login = validacaoLogin.values.login;
        var senha = validacaoLogin.values.senha;
        try {
            var resLogin = await getLogin(login, senha);
            return resLogin
        } catch (error) {

        }
        setLoading(false);
    };

    return (
        <form onSubmit={validacao.handleSubmit}>
            <div className="alinhar-centro">
                <div className="box-login" style={{ backgroundColor: useTema.palette.login.background }}>
                    <Grid container spacing={3} className="alinhar-centro centralizar-texto">
                        <Grid item xs={12}>
                            <img src={verificarDisponibilidadeDeImagens(temaSistema, "escuro")}></img>
                        </Grid>
                        <Grid item xs={12} sx={{ display: erro ? 'block' : 'none' }}>
                            <Alert severity="error">
                                O usuário e senha não correspondem com as informações que temos armazenadas. Por favor, tente novamente!
                            </Alert>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                fullWidth
                                label="Login"
                                variant="outlined"
                                name="login"
                                onChange={validacao.handleChange}
                                error={validacao.touched.login && Boolean(validacao.errors.login)}
                                helperText={validacao.touched.login && validacao.errors.login}
                            >
                            </TextField>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                fullWidth
                                label="Senha"
                                variant="outlined"
                                type="password"
                                name="senha"
                                onChange={validacao.handleChange}
                                error={validacao.touched.senha && Boolean(validacao.errors.senha)}
                                helperText={validacao.touched.senha && validacao.errors.senha}>
                            </TextField>
                        </Grid>
                        <Grid item lg={8} md={7} sm={7} xs={10}>
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button className="botao-login" type="submit" variant={"contained"} disabled={loading}>ENTRAR</Button>
                                {loading && (
                                    <CircularProgress size={24}
                                        color="inherit"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }} />
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                </div>
            </div>
        </form >


    )
}