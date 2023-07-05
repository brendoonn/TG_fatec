import { ResponsiveFunnel } from '@nivo/funnel'
import { Grid, Paper, Typography } from '@mui/material';
import { themeSettings } from '../../theme';
import { getData } from '../../Routes/getRoutes';
import { useEffect, useState } from 'react';
import { mockDataFunil } from '../../data/mockData';


export default function Funil() {
    interface tipoDados {
        id: string;
        value: number;
        label: string;
    }
    const useTema = themeSettings(localStorage.getItem("USER_THEME"));
    const [dadosMarcas, setDadosMarcas] = useState(new Array<tipoDados>());

    useEffect(() => {
        const fecthData = async () => {
            try {
                var marcas = await getData('MarcasMes');

                if (marcas.length < 2) {
                    marcas.push({ label: 'Outras marcas', id: 0, value: 0 });
                }
                setDadosMarcas(marcas);

            } catch (error) { }
        };
        fecthData();
    }, []);


    return (
        <Grid item lg={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '0 5px' }}>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    height: '450px',
                    padding: '30px 0'
                }}
            >
                <Typography
                    component='p'
                    color={`${useTema.palette.mode === 'dark' ? '#FFFFFF' : '#000000'}`}
                    sx={{
                        fontWeight: 700,
                        fontSize: '18px',
                        margin: '0 20px'
                    }}
                >
                    TOP 5 Marcas mais vendidas no mês
                </Typography>
                {dadosMarcas.length > 0 ? (
                    <ResponsiveFunnel
                        data={dadosMarcas}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        valueFormat=">-.0f"
                        colors={{ scheme: 'spectral' }}
                        borderWidth={20}
                        labelColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    3
                                ]
                            ]
                        }}
                        beforeSeparatorLength={100}
                        beforeSeparatorOffset={20}
                        afterSeparatorLength={100}
                        afterSeparatorOffset={20}
                        currentPartSizeExtension={10}
                        currentBorderWidth={40}
                        motionConfig="wobbly"
                    />
                ) : <>Sem dados</>}
            </Paper>
        </Grid>
    );
}