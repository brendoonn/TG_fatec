import { Grid, Paper, Typography } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { themeSettings } from "../../theme";
import { getData } from "../../Routes/getRoutes";
import { useEffect, useState } from "react";
import { formatarPrecoRealSimbolo } from "../../Utils/Validacoes/Mascaras";
import ProgressCircle from "./ProgressCircle";

export default function VendasMensais(){
    const useTema = themeSettings(localStorage.getItem("USER_THEME"));
    const [total, setTotal] = useState(0);

      //quando a página carregar vai executar a função
  useEffect(() => {
    const fecthData = async () => {
      try {
        var vendasMes = await getData('TotalVendasMes');
        setTotal(vendasMes[0].total_vendas);
        
      } catch (error) { }
    };
    fecthData();
  }, []);

    return (
        <Grid item lg={4} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            width: '50vh',
            height: '150px',
            margin: '0 5px'
          }}
        >
          <div
            style={{
              margin: '20px 0',
              padding: '0 20px',
              height: 100,
              width: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <LocationCityIcon sx={{ color: useTema.palette.mode === 'dark' ? '#4cceac' : '#00695F' }} />
              <Typography
                component='p'
                color={`${useTema.palette.mode === 'dark' ? '#FFFFFF' : '#000000'}`}
                sx={{
                  fontWeight: 700,
                }}
              >
                {formatarPrecoRealSimbolo(total)}
              </Typography>
              <Typography
                component='p'
                color={`${useTema.palette.mode === 'dark' ? '#4cceac' : '#00695F'}`}
                sx={{
                  fontWeight: 700,
                }}
              >
                Vendas mensais
              </Typography>
            </div>
            {/* <div>
              <div style={{ marginBottom: '20px' }}>
                <ProgressCircle progress={0.85} size={'35'} />
              </div>
              <div>
                <Typography
                  component='p'
                  color={`${useTema.palette.mode === 'dark' ? '#4cceac' : '#00695F'}`}
                  sx={{
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  +43%
                </Typography>
              </div>
            </div> */}
          </div>
        </Paper>
      </Grid>
    )
}