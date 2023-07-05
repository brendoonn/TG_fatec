import { menuConfiguracoes, menuEstoque, menuInicio, menuVendas } from "../../Constantes/Menu";
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import { useAppSelector } from "../../Hooks/useAppSelector";
import { verificaPermissaoMenu, verificaPermissoes } from "../../Utils/Tools";

export default function ListaItensMenu(props: any) {
  var display = props.open ? "block" : "none";
  const nivelAcesso = useAppSelector((state) => state.autenticar).nivelAcesso;

  const exibeLista = (secao: any) => {
    return (
      <>
        {verificaPermissaoMenu(secao, nivelAcesso) &&
          (
            <>
              <List >
                {secao.map((opcoes: any, index: any) => (
                  <div key={index}>
                    {opcoes.subitens ?
                      <div key={index}>
                        <Box sx={{ display: display }}>
                          <Typography sx={{ ml: 2, py: 1, fontWeight: '600' }} >{opcoes.title}</Typography>
                        </Box>
                        <List disablePadding>
                          {opcoes.subitens.map((sub: any, index2: any) =>
                            <>
                              {verificaPermissoes(sub.acesso, nivelAcesso) &&
                                <ListItemButton key={index2} href={sub.path} sx={{ py: 0.5 }}>
                                  <ListItemIcon>
                                    {sub.image}
                                  </ListItemIcon>
                                  <ListItemText primary={sub.title} />
                                </ListItemButton>
                              }
                            </>
                          )}
                        </List>
                      </div> :
                      <ListItemButton key={index}>
                        <ListItemIcon>
                          {opcoes.image}
                        </ListItemIcon>
                        <ListItemText primary={opcoes.title} />
                      </ListItemButton>}
                  </div>
                ))}
              </List>
              <Divider />
            </>
          )}
      </>
    );
  }


  return (

    <>
      {exibeLista(menuInicio)}
      {exibeLista(menuEstoque)}
      {exibeLista(menuVendas)}
      {exibeLista(menuConfiguracoes)}
    </>
  );
}