import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import SettingsIcon from '@mui/icons-material/Settings';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { NiveisDeAcessoDisponivies } from './DireitosDeAcesso';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export const menuInicio = [
    {
        title: 'INÍCIO',
        image: <HomeIcon />,
        subitens: [
            {
                title: "Dashboards",
                image: <HomeIcon />,
                path: '/',
                acesso: NiveisDeAcessoDisponivies.acessoGeral,
            }
        ]
    },
]

export const menuEstoque = [
    {
        title: 'ESTOQUE',
        image: <InventoryIcon />,
        subitens: [
            {
                title: 'Produtos',
                image: <ShoppingBagIcon />,
                path: '/produtos',
                acesso: NiveisDeAcessoDisponivies.acessoGeral
            },
            {
                title: 'Entrada no Estoque',
                image: <CallMadeIcon />,
                path: '/entradanoestoque',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoEstoque
            },
            {
                title: 'Baixa no Estoque',
                image: <CallReceivedIcon />,
                path: '/baixanoestoque',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoEstoque
            },
            {
                title: 'Fornecedores',
                image: <GroupsIcon />,
                path: '/fornecedores',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoEstoque
            },
            {
                title: 'Marcas',
                image: <BrandingWatermarkIcon />,
                path: '/marcas',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoEstoque
            },
            {
                title: 'Categorias',
                image: <CategoryIcon />,
                path: '/categorias',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoEstoque
            }
        ]
    },]
export const menuVendas = [
    {
        title: 'VENDAS',
        image: <InventoryIcon />,
        acesso: NiveisDeAcessoDisponivies.niveisDeAcessoVenda,
        subitens: [
            {
                title: 'Vendas Efetuadas',
                image: <ShoppingCartIcon />,
                path: '/vendas',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoVenda
            },
            {
                title: 'Clientes',
                image: <PeopleIcon />,
                path: '/clientes',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoVenda
            },]
    }
]

export const menuConfiguracoes = [
    {
        title: 'CONFIGURAÇÕES',
        image: <SettingsIcon />,
        path: '/configuracao',
        acesso: NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes,
        subitens: [
            {
                title: 'Personalizar',
                image: <FormatColorFillIcon />,
                path: '/personalizarsistema',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes,
            },
            {
                title: 'Usuários',
                image: <ManageAccountsIcon />,
                path: '/usuarios',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes,
            },
            {
                title: 'Cargos',
                image: <RecentActorsIcon />,
                path: '/cargos',
                acesso: NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes,
            },

        ]
    },

]
