export interface Cliente{
    ID_pessoa: number,
    nome: string,
    sobrenome: string,
    cpf: string,
    data_nascimento: string,
    celular: string,
    email: string,
    data_available: number
}


export interface ClientePost{
    ID_pessoa: number,
    nome: string,
    sobrenome: string,
    cpf: string,
    data_nascimento: string,
    celular: string,
    email: string,
    ID_endereco: number,
    cidade: string,
    bairro: string,
    rua: string,
    uf: string,
    numero: number,
    referencia: string,
    cep: string,
    fk_fornecedor: number
    fk_pessoa: number
}