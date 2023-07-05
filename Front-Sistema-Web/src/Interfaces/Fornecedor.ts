export interface Fornecedor{
    ID_fornecedor: number,
    cnpj: string,
    razao_social: number,
    email: number,
    telefone: string,
    data_available: number
}

export interface FornecedorPost{
    ID_fornecedor: number,
    cnpj: string,
    razao_social: string,
    email:string ,
    telefone:  string,
    ID_endereco: number,
    cidade:    string,
    bairro:string ,
    rua: string ,
    uf: string ,
    referencia: string,
    cep: string ,
    fk_fornecedor: number,
    fk_pessoa: number,
    numero: number,
}