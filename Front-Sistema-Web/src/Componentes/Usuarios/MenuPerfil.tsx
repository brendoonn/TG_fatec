import { Divider, Paper, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import ContactPageIcon from '@mui/icons-material/ContactPage';

export default function MenuPerfil(props: any) {
    return (
        <Paper variant="outlined">
            <div className="espacamento-interno-box">
                <List>
                    <ListItemButton onClick={() => props.setTrocarPaper(false)}>
                        <ListItemIcon>
                            <ContactPageIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dados Pessoais"} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={() => props.setTrocarPaper(true)}>
                        <ListItemIcon>
                            <KeyIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Alterar senha"} />
                    </ListItemButton>
                </List>
            </div>
        </Paper>
    )
}