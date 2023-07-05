import { Box, BoxProps } from "@mui/material";

export function ItemBox(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                m: 1,
            }}
            {...other}
        />
    );
}