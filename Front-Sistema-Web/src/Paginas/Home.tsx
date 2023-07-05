import { Box, Typography, useTheme, Grid, Paper } from "@mui/material";
import { tokens } from "../Tema/Cores";
import LineChart from "../Componentes/DashBoards/LineChart";
import BarChart from "../Componentes/DashBoards/BarChart";
import ProgressCircle from "../Componentes/DashBoards/ProgressCircle";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { themeSettings } from "../Tema/theme";
import VendasAnuais from "../Componentes/DashBoards/VendasAnuais";
import Funil from "../Componentes/DashBoards/Funil";
import Torta from "../Componentes/DashBoards/Torta";
import VendasMensais from "../Componentes/DashBoards/VendasMensais";
import ComprasMensais from "../Componentes/DashBoards/ComprasMensais";

export default function Home() {

  const theme = useTheme();
  const useTema = themeSettings(localStorage.getItem("USER_THEME"));
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="grid"
      justifyContent='center'
      flexDirection='column'
      // gridTemplateColumns="repeat(12, 1fr)"
      gap="20px"
      height='1024px'
    >
      <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={2}>
        <VendasMensais />
        <VendasAnuais />
        <ComprasMensais />
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={2}>
        <LineChart isDashboard={true} />
      </Grid>
      <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={2}>
        <Torta />
        <Funil />
      </Grid>
    </Box>
  );
}
