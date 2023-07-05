import { ResponsiveLine } from "@nivo/line";
import { Grid, Paper, Typography, useTheme } from "@mui/material";
import { themeSettings, tokens } from "../../theme";
import { coresLineCharts, mockLineData as data } from "../../data/mockData";
import { useEffect, useState } from "react";
import { getData } from "../../Routes/getRoutes";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { formatarPrecoPadrao } from "../../Utils/Validacoes/Mascaras";
import { utils, write, writeFile } from "xlsx";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  interface tipoDados {
    id: string;
    color: string;
    data: [];
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dados, setDados] = useState(new Array<tipoDados>());
  const [totalVendas, setTotalVendas] = useState(0);
  const useTema = themeSettings(localStorage.getItem("USER_THEME"));
  function formatCategoryData(categoryData: any[], colors: string[]): any[] {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
  
    return categoryData.map((category: any, index: number) => {
      const parsedData = JSON.parse(category.data);
  
      const mergedData = months.map((month) => {
        const existingData = parsedData.find((point: any) => point.x === month);
        const y = existingData ? existingData.y : 0;
        return { x: month, y };
      });
  
      return {
        id: category.id,
        data: mergedData,
        color: colors[index],
      };
    });
  }


  function getTotalVendas(categoryData: any): number {
    let totalVendas = 0;
  
    categoryData.forEach((category: any) => {
      const parsedData = JSON.parse(category.data);
      parsedData.forEach((point: { x: string; y: number }) => {
        totalVendas += point.y;
      });
    });
  
    return totalVendas;
  }


  //quando a página carregar vai executar a função
  useEffect(() => {
    const fecthData = async () => {
      try {
        var vendasAno = await getData('VendasAno');
        var dados = new Array<tipoDados>();
        dados = formatCategoryData(vendasAno, coresLineCharts);
        console.log("dados", dados);
        setDados(dados);
        setTotalVendas(getTotalVendas(vendasAno));
      } catch (error) { }
    };
    fecthData();
  }, []);

function exportToExcel(data: any) {
  const workbook = utils.book_new();
  const sheetData = data.flatMap((item: any) =>
    item.data.map((dataItem: any) => ({
      categoria: item.id,
      mes: dataItem.x,
      quantidade: dataItem.y,
    }))
  );

  const uniqueCategories = Array.from(
    new Set(sheetData.map((item: any) => item.categoria))
  );
  const uniqueMonths = Array.from(
    new Set(sheetData.map((item: any) => item.mes))
  );

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const worksheetData = [
    ["Categorias", ...monthNames],
    ...uniqueCategories.map((cat) => {
      return [
        cat,
        ...monthNames.map((month) => {
          const item = sheetData.find(
            (dataItem: any) =>
              dataItem.categoria === cat && dataItem.mes === month
          );
          return item ? item.quantidade : "";
        }),
      ];
    }),
  ];

  const worksheet = utils.aoa_to_sheet(worksheetData, {
    cellStyles: true,
    cellDates: true,
  });

  const sheetName = "Vendas-Ao-Ano-Por-Categoria";

  utils.book_append_sheet(workbook, worksheet, sheetName);
  writeFile(workbook, sheetName + ".xlsx", { compression: true });
}
  
  return (
      <Grid item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '0 5px' }}>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            height: '400px',
            padding: '30px 0'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0 20px'
            }}
          >
            <div>
              <Typography
                component='p'
                color={`${useTema.palette.mode === 'dark' ? '#FFFFFF' : '#000000'}`}
                sx={{
                  fontWeight: 700,
                }}
              >
                Vendas no Ano
              </Typography>
              <Typography
                component='p'
                color={`${useTema.palette.mode === 'dark' ? '#4cceac' : '#00695F'}`}
                sx={{
                  fontWeight: 700,
                  fontSize: '18px'
                }}
              >
                R$ {formatarPrecoPadrao(totalVendas)}
              </Typography>
            </div>
            <div><DownloadOutlinedIcon onClick={() =>exportToExcel(dados)} sx={{ color: useTema.palette.mode === 'dark' ? '#4cceac' : '#00695F', fontSize: 35 }} /></div>
          </div>
          <ResponsiveLine
            data={dados}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: colors.grey[100],
                  },
                },
                legend: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                ticks: {
                  line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: colors.grey[100],
                  },
                },
              },
              legends: {
                text: {
                  fill: colors.grey[100],
                },
              },
              tooltip: {
                container: {
                  color: colors.primary[500],
                },
              },
            }}
            colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              // orient: "bottom",
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? undefined : "transportation",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              // orient: "left",
              tickValues: 5,
              tickSize: 3,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? undefined : "count",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}

          />
        </Paper>
      </Grid>

  );
};

export default LineChart;
