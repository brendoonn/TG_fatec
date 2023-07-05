import { Box, Container, styled } from "@mui/material";
import MenuLateral from "../BarraDeNavegacao/Index";
import "../../Estilos/Css/Customizacao.css";

export default function ContainerGeral({ children }: { children: JSX.Element }) {
    const ContainerCustomizado = styled(Container)(({ theme }) => ({
        marginTop: "6rem",
        marginBottom: "5rem",
        [theme.breakpoints.up('md')]: {
            marginLeft: "3rem !important",
            marginRight: "3rem !important",
        },
        [theme.breakpoints.down('md')]:{
            marginLeft: "1rem !important",
            marginRight: "1rem !important",
        }
    }));
    
    return (
        <>
            <Box sx={{
                display: "flex",
                minHeight: "100vh"
            }}>
                <MenuLateral></MenuLateral>
                <ContainerCustomizado disableGutters={true} maxWidth="xl">
                    {children}
                </ContainerCustomizado>
            </Box>
        </>
    )
}