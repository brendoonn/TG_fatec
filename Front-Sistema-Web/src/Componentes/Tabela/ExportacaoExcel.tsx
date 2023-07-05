import { MenuItem } from "@mui/material";
import { GridToolbarExportContainer, gridFilteredSortedRowIdsSelector, gridVisibleColumnFieldsSelector, useGridApiContext } from "@mui/x-data-grid";
import { utils, writeFile } from "xlsx";

export function BotaoExportacao(props: any) {
    return (
        <GridToolbarExportContainer {...props}>
            <MenuExportacao colunas={props.colunas} />
        </GridToolbarExportContainer>
    );
}

function MenuExportacao(props: any) {
    const apiRef = useGridApiContext();
    const { hideMenu } = props;

    return (
        <MenuItem
            onClick={() => {
                handleExport(apiRef, props.colunas);
                // Hide the export menu after the export
                hideMenu?.();
            }}
        >
            Download Excel
        </MenuItem>
    );
}

function handleExport(apiRef: any, colunas: any) {
    const data = getExcelData(apiRef);
    const campos = colunas.map((c: any) => c.field);
    const linhas = data.map((row: any) => {
        const mRow: any = {};
        for (const key of campos) {
            mRow[key] = row[key];
        }
        return mRow;
    });

    const columnNames = colunas.map((c: any) => c.headerName);
    const worksheet = utils.json_to_sheet(linhas);
    utils.sheet_add_aoa(worksheet, [[...columnNames]], {
        origin: 'A1',
    });

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, document.title + ".xlsx", { compression: true });
}

function getExcelData(apiRef: any) {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    return filteredSortedRowIds.map((id) => {
        const row: any = {};
        visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
        });
        return row;
    });
}

