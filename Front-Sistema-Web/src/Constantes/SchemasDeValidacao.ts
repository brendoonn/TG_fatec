import * as yup from "yup";
import { validarPreco, validarSenha } from "../Utils/Validacoes/Validacoes";
import {validarCnpj, validarCpf } from "../Utils/Validacoes/Validacoes";


export const schemaValidacaoProduto = yup.object().shape({
    nome: yup.string().required("O nome do produto é obrigatório!"),
    ID_produto: yup.string().required("O código do produto é obrigatório!"),
    peso: yup.number().required("O peso é obrigatório!"),
    FK_marca: yup.number().required("Por favor, selecione uma marca!").positive("Por favor, selecione uma marca!"),
    valorUnitario: yup.string().required("O valor unitário é obrigatório!").test('test-validacao-valorUnitario', 'Preço inválido', (valorUnitario) => validarPreco(valorUnitario)),
    FK_categoria: yup.number().required("Por favor, selecione uma categoria!").positive("Por favor, selecione uma categoria!"),
    min_recomendado: yup.number().required("Por favor, insira uma quantidade").positive("Por favor, insira uma quantidade"),
    descricao: yup.string(),
});

export const schemaValidacaoEstoque = yup.object().shape({
    ID_produto: yup.number().required("Por favor, escolha um produto").positive("Por favor, escolha um produto"),
    fornecedor: yup.number().required("Por favor, escolha um fornecedor").positive("Por favor, escolha um fornecedor"),
    quantidade: yup.number().required("Por favor, digite uma quantidade").positive("Por favor, insira um valor positivo!"),
    ID_compra: yup.number().required("O código da compra é obrigatório!").positive("Por favor, digite o código da compra"),
    validade:  yup.string().required("A validade é obrigatória!"),
    valor: yup.string().required("Por favor, digite o valor da compra!").test('test-validacao-preco', 'Preço inválido', (valor) => validarPreco(valor)),
});

export const schemaValidacaoBaixaEstoque = yup.object().shape({
    ID_produto: yup.number().required("Por favor, escolha um produto").positive("Por favor, escolha um produto"),
    quantidade: yup.number().required("Por favor, digite uma quantidade").positive("Por favor, insira um valor positivo!"),
    justificativa:  yup.string().required("A justificativa é obrigatória!"),
});

export const schemaValidacaoCliente = yup.object().shape({
    nome: yup.string().required("O nome é um campo obrigatório!"),
    sobrenome: yup.string().required("O sobrenome é um campo obrigatório!"),
    cpf: yup.string().required("O CPF é um campo obrigatório!").test('test-validacao-cpf', 'CPF inválido', (cpf) =>  validarCpf(cpf)),
    celular: yup.string().required("O celular é obrigatório!"),
    email: yup.string().required("O e-mail é um campo obrigatório!").email("Por favor, insira um e-mail válido"),
    cidade: yup.string().required("Cidade é um campo obrigatório!"),
    bairro: yup.string().required("Bairro é um campo obrigatório!"),
    rua: yup.string().required("Rua é um campo obrigatório!"),
    uf: yup.string().required("UF é um campo obrigatório!"),
    cep:  yup.string().required("CEP é um campo obrigatório!"),
    numero: yup.number().required("O número é um campo obrigatório").positive("O número é um campo obrigatório")
});

export const schemaValidacaoFornecedor = yup.object().shape({
    cnpj: yup.string().required("O CNPJ é um campo obrigatório!").test('test-validacao-cnpj', 'CNPJ inválido', (cnpj) =>  validarCnpj(cnpj)),
    razao_social: yup.string().required("Razão social é um campo obrigatório!"),
    telefone: yup.string().required("O Telefone é obrigatório!"),
    email: yup.string().required("O e-mail é um campo obrigatório!").email("Por favor, insira um e-mail válido"),
    cidade: yup.string().required("Cidade é um campo obrigatório!"),
    bairro: yup.string().required("Bairro é um campo obrigatório!"),
    rua: yup.string().required("Rua é um campo obrigatório!"),
    uf: yup.string().required("UF é um campo obrigatório!"),
    cep:  yup.string().required("CEP é um campo obrigatório!"),
    numero: yup.number().required("O número é um campo obrigatório").positive("O número é um campo obrigatório")
});

export const schemaValidacaoUsuario = yup.object().shape({
    nome: yup.string().required("O nome é um campo obrigatório!"),
    sobrenome: yup.string().required("O sobrenome é um campo obrigatório!"),
    cpf: yup.string().required("O CPF é um campo obrigatório!").test('test-validacao-cpf', 'CPF inválido', (cpf) =>  validarCpf(cpf)),
    celular: yup.string().required("O telefone é obrigatório!"),
    email: yup.string().required("O e-mail é um campo obrigatório!").email("Por favor, insira um e-mail válido"),
    data_nascimento: yup.string().required("O data de nascimento é um campo obrigatório!"),
    FK_cargo: yup.number().required("O cargo é um campo obrigatório!").positive("Por favor, insira um cargo"),
    login: yup.string().required("Login é um campo obrigatório!"),
    senha: yup.string().required("Senha é um campo obrigatório!"),
    nivelDeAcesso:  yup.string().required("Nível de acesso é um campo obrigatório!"),
    cidade: yup.string().required("Cidade é um campo obrigatório!"),
    bairro: yup.string().required("Bairro é um campo obrigatório!"),
    rua: yup.string().required("Rua é um campo obrigatório!"),
    uf: yup.string().required("UF é um campo obrigatório!"),
    cep:  yup.string().required("CEP é um campo obrigatório!"),
    numero: yup.number().required("O número é um campo obrigatório").positive("O número é um campo obrigatório")
});

export const schemaValidacaoEditarPerfil = yup.object().shape({
    nome: yup.string().required("O nome é um campo obrigatório!"),
    sobrenome: yup.string().required("O sobrenome é um campo obrigatório!"),
    cpf: yup.string().required("O CPF é um campo obrigatório!").test('test-validacao-cpf', 'CPF inválido', (cpf) =>  validarCpf(cpf)),
    celular: yup.string().required("O Celular é obrigatório!"),
    email: yup.string().required("O e-mail é um campo obrigatório!").email("Por favor, insira um e-mail válido"),
    data_nascimento: yup.string(),
    FK_cargo: yup.number().required("O cargo é um campo obrigatório!").positive("Por favor, insira um cargo"),
    cidade: yup.string().required("Cidade é um campo obrigatório!"),
    bairro: yup.string().required("Bairro é um campo obrigatório!"),
    rua: yup.string().required("Rua é um campo obrigatório!"),
    uf: yup.string().required("UF é um campo obrigatório!"),
    cep:  yup.string().required("CEP é um campo obrigatório!"),
    numero: yup.number().required("O número é um campo obrigatório").positive("O número é um campo obrigatório")
});

export const schemaValidacaoAlterarSenha = yup.object().shape({
    novaSenha: yup.string().required("Esse campo é obrigatório").test('test-validacao-senha', 'A senha não corresponde aos critérios exigidos', (novaSenha) => validarSenha(novaSenha)),
    confirmarSenha: yup.string().required("Esse campo é obrigatório").oneOf([yup.ref('novaSenha'), null], 'O campo não corresponde a senha digitada'),
});

export const schemaValidacaoEditarCliente = yup.object().shape({
    nome: yup.string().required("O nome é um campo obrigatório!"),
    sobrenome: yup.string().required("O sobrenome é um campo obrigatório!"),
    cpf: yup.string().required("O CPF é um campo obrigatório!").test('test-validacao-cpf', 'CPF inválido', (cpf) =>  validarCpf(cpf)),
    celular: yup.string().required("O telefone é obrigatório!"),
    email: yup.string().required("O e-mail é um campo obrigatório!").email("Por favor, insira um e-mail válido"),
});

export const schemaValidacaoEndereco = yup.object().shape({
    cidade: yup.string().required("Cidade é um campo obrigatório!"),
    bairro: yup.string().required("Bairro é um campo obrigatório!"),
    rua: yup.string().required("Rua é um campo obrigatório!"),
    uf: yup.string().required("UF é um campo obrigatório!"),
    cep:  yup.string().required("CEP é um campo obrigatório!"),
    numero: yup.number().required("O número é um campo obrigatório").positive("O número é um campo obrigatório")
});

export const schemaValidacaoEditarFornecedor = yup.object().shape({
    cnpj: yup.string().required("O CNPJ é um campo obrigatório!").test('test-validacao-cnpj', 'CNPJ inválido', (cnpj) =>  validarCnpj(cnpj)),
    razao_social: yup.string().required("Razão social é um campo obrigatório!"),
    telefone: yup.string().required("O Telefone é obrigatório!"),
    email: yup.string().required("O e-mail é um campo obrigatório!").email("Por favor, insira um e-mail válido"),
});

export const schemaValidacaoMarca = yup.object().shape({
    nome_marca: yup.string().required("O nome da marca é obrigatório!"),
    nacionalidade: yup.string().required("Por favor, preencha esse campo!"),
});

export const schemaValidacaoCargo= yup.object().shape({
    cargo: yup.string().required("O nome do cargo é obrigatório!"),
});

export const schemaValidacaoCategoria = yup.object().shape({
    categoria: yup.string().required("O nome da categoria é obrigatório!"),
    desc_categoria: yup.string().required("Uma descrição para a categoria é obrigatória!"),
});

export const schemaValidacaoLogar = yup.object().shape({
    login: yup.string().required("O login é obrigatório para logar"),
    senha: yup.string().required("A senha é obirgatória para logar"),
})

export const schemaValidacaoConfiguracao = yup.object().shape({
    cnpj: yup.string().test('test-validacao-cnpj', 'CNPJ inválido', (cnpj) =>  validarCnpj(cnpj)),
    nome_fantasia: yup.string().required("O campo é obrigatório"),
    nome_empresarial: yup.string().required("O campo é obrigatório"),
    inscricao_estadual: yup.string().required("O campo é obrigatório"),
    inscricao_municipal: yup.string().required("O campo é obrigatório"),
    telefone: yup.string().required("O campo é obrigatório"),
    cidade: yup.string().required("O campo é obrigatório"),
    bairro: yup.string().required("O campo é obrigatório"),
    rua: yup.string().required("O campo é obrigatório"),
    uf: yup.string().required("O campo é obrigatório"),
    cep:  yup.string().required("O campo é obrigatório"),
    numero: yup.string().required("O campo é obrigatório"),
    data_abertura: yup.string().required("O campo é obrigatório"),
    complemento: yup.string().required("O campo é obrigatório"),
});