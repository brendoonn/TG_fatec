import { Grid, Paper, Typography } from "@mui/material";
import { themeSettings } from "../../theme";
import { ResponsivePie } from "@nivo/pie";
import { coresTorta, mockedTorta } from "../../data/mockData";
import { useEffect, useState } from "react";
import { getData } from "../../Routes/getRoutes";

export default function Torta() {

    interface tipoDados {
        id: string;
        value: number;
        label: string;
    }
    const useTema = themeSettings(localStorage.getItem("USER_THEME"));
    const [dados, setDados] = useState(new Array<tipoDados>());

    function addColorToData(data: any[], colors: string[]): any[] {
        return data.map((item, index) => {
          const colorIndex = index % colors.length;
          const color = colors[colorIndex];
      
          return {
            ...item,
            color,
          };
        });
      }

    useEffect(() => {
        const fecthData = async () => {
            try {
                var dadosProdutos = await getData('ProdutosMes');
                if(dadosProdutos.length > 0){
                    dadosProdutos = addColorToData(dadosProdutos, coresTorta);
                    setDados(dadosProdutos);
                }
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
                    TOP 10 Produtos mais vendidos no mês
                </Typography>
                <ResponsivePie
                    data={dados}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor={`${useTema.palette.mode === 'dark' ? '#FFFFFF' : '#000000'}`}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    // legends={[
                    //     {
                    //         anchor: 'bottom',
                    //         direction: 'row',
                    //         justify: false,
                    //         translateX: 0,
                    //         translateY: 56,
                    //         itemsSpacing: 0,
                    //         itemWidth: 100,
                    //         itemHeight: 18,
                    //         itemTextColor: '#999',
                    //         itemDirection: 'left-to-right',
                    //         itemOpacity: 1,
                    //         symbolSize: 18,
                    //         symbolShape: 'circle',
                    //         effects: [
                    //             {
                    //                 on: 'hover',
                    //                 style: {
                    //                     itemTextColor: '#000'
                    //                 }
                    //             }
                    //         ]
                    //     }
                    // ]}
                />
            </Paper>
        </Grid>
    )
}