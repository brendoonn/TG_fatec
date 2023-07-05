import { Container } from "@mui/material";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import { styled } from '@mui/system';

export default function ContainerLogin({ children }: { children: JSX.Element }) {
    const ContainerCustomizado = styled(Container)(({ theme }) => ({
        marginTop: "6rem",
        marginBottom: "5rem",
    }));
      
    return (
        <>
            <Cabecalho></Cabecalho>
            <ContainerCustomizado disableGutters={true} maxWidth="xl">
                {children}
            </ContainerCustomizado>
            <footer className="fim-da-pagina">
                <Rodape></Rodape>
            </footer>
        </>
    )
}