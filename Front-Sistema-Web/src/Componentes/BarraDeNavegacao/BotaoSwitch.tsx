import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext } from 'react';
import { ColorModeContext } from '../../Tema/theme';
import { SwitchPersonalizado } from './ComponentesPersonalizados';

export default function BotaoSwitch(props: any) {
    const colorMode = useContext(ColorModeContext);
    const valor = localStorage.getItem("USER_THEME") === "dark" ? true : false;
    
    return (
        <FormGroup>
            <FormControlLabel
                onClick={colorMode.toggleColorMode}
                checked={valor}
                control={<SwitchPersonalizado sx={{ m: 1 }} />}
                label={!props.telaDesktop ? "Modo Escuro" : ""}
            />
        </FormGroup>
    );
}
