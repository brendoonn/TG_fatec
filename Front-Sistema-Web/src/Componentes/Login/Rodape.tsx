import { Typography } from "@mui/material";
import { themeComponents } from "../../Tema/theme";

export default function Rodape() {
    const useTema = themeComponents(localStorage.getItem("USER_THEME"));
    return (
        <div className="rodape-login" style={{backgroundColor: useTema.palette.login.background}}>
            <Typography variant="body2" textAlign="center">
                Todos os direitos  reservados
            </Typography>
        </div>
    );
}