import { Typography } from "@mui/material";
import { themeComponents } from "../../Tema/theme";
import BotaoSwitch from "../BarraDeNavegacao/BotaoSwitch";

export default function Cabecalho() {
  const useTema = themeComponents(localStorage.getItem("USER_THEME"));

  return (
    <header>
      <div className="cabecalho-login" style={{backgroundColor: useTema.palette.login.background}}>
        <Typography variant="body2" textAlign="center">
          Ambiente seguro
        </Typography>
        {/* <BotaoSwitch></BotaoSwitch> */}
      </div>
    </header>
  );
}