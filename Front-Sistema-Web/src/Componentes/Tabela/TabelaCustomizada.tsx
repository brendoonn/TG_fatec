import * as React from 'react';
import { DataGrid, GridToolbarContainer, ptBR } from '@mui/x-data-grid';
import { Container, Grid } from '@mui/material';
import { themeComponents } from '../../Tema/theme';
import { CustomNoRowsOverlay, datagridSx } from './Personalizacoes';
import { BotaoExportacao } from './ExportacaoExcel';

export default function TabelaCustomizada(props: any) {
    const useTema = themeComponents(localStorage.getItem("USER_THEME"));
    const { rows, colunas } = props;
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    function CustomToolbar(props: any) {
        return (
            <GridToolbarContainer {...props}>
                <BotaoExportacao colunas={colunas} />
            </GridToolbarContainer>
        );
    }

    const [pageSize, setPageSize] = React.useState<number>(20);

    return (
        <Grid container>
            <Grid item xs={12} xl={12}>
                <div style={{ height: 700, width: "100%", marginTop: '3rem' }}>
                    <DataGrid
                        style={{ backgroundColor: useTema.palette.dataGrid.background }}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize: any) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[20, 30, 50]}
                        sx={datagridSx(useTema, props.cor)}
                        pagination
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        rows={props.linhas}
                        columns={props.colunas}
                        components={{
                            Toolbar: CustomToolbar,
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                    />
                </div>
            </Grid>
        </Grid>

    );
}

