import { IrPara } from "../../Utils/Tools";
import SendIcon from '@mui/icons-material/Send';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

export const BotoesDeAcao = (url: string) => {
    return (
        <>
            <button onClick={() => IrPara(url)} className="botao-cancelar">
                <DoDisturbIcon /> Cancelar
            </button>
            <button type="submit"
                className="botao-salvar">
                <SendIcon /> Salvar
            </button>
        </>
    )
}