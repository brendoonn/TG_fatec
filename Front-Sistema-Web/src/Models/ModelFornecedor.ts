export class ModelFornecedor {
    ID_fornecedor: number = 0;
    cnpj: string = "";
    razao_social: string = "";
    telefone: string = "";
    email: string = "";
    ID_endereco: number = 0;
    cidade: string = "";
    bairro: string = "";
    rua: string = "";
    uf: string = "";
    numero: number = 0;
    referencia: string = "";
    cep: string = "";
    fk_fornecedor: number = 0;
    fk_pessoa: number = 0;
}