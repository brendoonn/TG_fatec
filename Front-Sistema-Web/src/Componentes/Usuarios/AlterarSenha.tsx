import { Box, Button, FormControl, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { ItemBox } from "../ItemBox";
import CheckIcon from '@mui/icons-material/Check';

import "../../Estilos/Css/login.css";

export default function AlterarSenha(props: any) {
    var validacao = props.validacao;

    const gridAlinharDireita = {
        display: 'flex',
        justifyContent: 'flex-end',
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4"><strong>Alterar Senha</strong></Typography>
            </Grid>
            <Grid item lg={5}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="No mínimo 8 caracteres" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pelo menos um caracter especial" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pelo menos uma letra maiúscula" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pelo menos um digito numérico" />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={12} lg={7}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="novaSenha"
                            label={"Nova Senha"}
                            name={"novaSenha"}
                            type="password"
                            onChange={validacao.handleChange}
                            error={validacao.touched.novaSenha && Boolean(validacao.errors.novaSenha)}
                            helperText={validacao.touched.novaSenha && validacao.errors.novaSenha}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="confirmarSenha"
                            label={"Confirmar Senha"}
                            name={"confirmarSenha"}
                            type="password"
                            onChange={validacao.handleChange}
                            error={validacao.touched.confirmarSenha && Boolean(validacao.errors.confirmarSenha)}
                            helperText={validacao.touched.confirmarSenha && validacao.errors.confirmarSenha}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={"flex"} justifyContent={"flex-end"}>
                            {/* <ItemBox> */}
                            <Button variant="contained" type="submit">Salvar</Button>
                            {/* </ItemBox> */}
                        </Box>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>
    )
}