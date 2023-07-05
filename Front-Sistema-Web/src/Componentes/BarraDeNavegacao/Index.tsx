import * as React from 'react';
import Box from '@mui/material/Box';
import { CssBaseline, Avatar, Divider, IconButton, Menu, Toolbar, Hidden, Grid, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from '../../Estilos/MakeStyles/StylesSite';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deslogar } from '../../features/Autenticacao/autenticacao-slice';
import { IrPara, verificarDisponibilidadeDeImagens } from '../../Utils/Tools';
import BotaoSwitch from './BotaoSwitch';
import ListaItensMenu from './ListaItensMenu';
import { AppBar, Drawer, DrawerHeader } from './ComponentesPersonalizados';
import { useAppSelector } from '../../Hooks/useAppSelector';


export default function MenuLateral() {
  const theme = useTheme();
  const telaDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [open, setOpen] = React.useState(telaDesktop);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const temaSistema = useAppSelector((state) => state.definirTema);
  const dispatch = useDispatch();
  const classes = useStyles();
  const abrirOuFechar = (opcao: boolean) => {
    setOpen(opcao);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const fecharAoClicar = () => {
    setAnchorElUser(null);
  };
  const Sair = () => {
    dispatch(deslogar());
    IrPara('/login');
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => abrirOuFechar(true)}
              edge="start"
              sx={{
                marginRight: 1,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}>
              SISTEMA
            </Typography> */}
            <div style={{ flexGrow: 1, padding: 0, display: "flex", margin: "auto" }}>
              <img src={verificarDisponibilidadeDeImagens(temaSistema, "claro")} alt="logo"></img>
            </div>
            <Hidden mdDown>
              <BotaoSwitch telaDesktop={telaDesktop}></BotaoSwitch>
            </Hidden>
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={fecharAoClicar}
            >
              <MenuItem onClick={() => IrPara("/perfil")}>Perfil</MenuItem>
              <MenuItem onClick={Sair}>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Hidden lgDown>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={() => abrirOuFechar(false)}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <>
              <ListaItensMenu open={open}></ListaItensMenu>
            </>
          </Drawer>
        </Hidden>
        <Hidden lgUp>
          <SwipeableDrawer
            classes={{ paper: classes.menuLateralMobile }}
            anchor={"left"}
            open={open}
            onClose={() => abrirOuFechar(false)}
            onOpen={() => abrirOuFechar(true)}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box p={1} display="flex" justifyContent={"flex-end"}>
                  <IconButton onClick={() => abrirOuFechar(false)}>
                    <CloseIcon style={{ fontSize: 25 }} />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}>
                <Hidden mdUp>
                  <Box sx={{pl:1}}>
                    <BotaoSwitch telaDesktop={telaDesktop}></BotaoSwitch>
                  </Box>
                </Hidden>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}>
                <ListaItensMenu open={open}></ListaItensMenu>
              </Grid>
            </Grid>
          </SwipeableDrawer>
        </Hidden>
      </Box>
    </>
  );
}

