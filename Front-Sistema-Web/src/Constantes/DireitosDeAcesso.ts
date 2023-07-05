const niveisDeAcesso = {
  Estoquista: "Estoque",
  Vendedor: "Venda",
  Administrador: "Administrador"
};

const acessoGeral = [
    niveisDeAcesso.Vendedor,
    niveisDeAcesso.Administrador,
    niveisDeAcesso.Estoquista,
]

const niveisDeAcessoVenda = [
    niveisDeAcesso.Vendedor,
    niveisDeAcesso.Administrador,
];

const niveisDeAcessoEstoque = [
    niveisDeAcesso.Estoquista,
    niveisDeAcesso.Administrador,
]

const niveisDeAcessoConfiguracoes = [
    niveisDeAcesso.Administrador
]

export const NiveisDeAcessoDisponivies = {
    niveisDeAcessoVenda,
    niveisDeAcessoEstoque,
    niveisDeAcessoConfiguracoes,
    acessoGeral
}

export const listaNivelAcesso = Object.values(niveisDeAcesso);