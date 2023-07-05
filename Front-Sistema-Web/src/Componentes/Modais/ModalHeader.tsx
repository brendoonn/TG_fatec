import { Divider, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { propsModalHeader } from "../../Interfaces/Modais";

export default function ModalHeader(props: propsModalHeader) {
    return (
        <div className='modal-header'>
            <Grid container>
                <Grid item xs={10} sx={{
                    display: "flex",
                    margin: "auto",
                }}>
                    <Typography variant="h6" sx={{fontWeight:"bold"}}>{props.titulo}</Typography>
                </Grid>
                <Grid item xs={2} justifyContent={"flex-end"} display="flex">
                    <IconButton aria-label="close" onClick={() => props.fecharModal()}>
                        <CloseIcon style={{ fontSize: 25 }} />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ marginTop: "0.5rem" }}></Divider>
                </Grid>
            </Grid>
        </div>
    );
}