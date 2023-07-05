import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles((theme: Theme) => ({
    botaoModalEndereco: {
        marginTop: "auto",
        display: "flex",
        justifyContent: "flex-end"
    },
    modalEspacamento: {
        margin: "-20px",
    },
    menuLateralMobile: {
        width: "80%",
    },
    "&MuiDataGrid-columnHeaders": {
        backgroundColor: "rgba(0,0,255,0.6)",
    }

}));

