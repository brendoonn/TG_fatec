import { date } from "yup";

export class ModelCliente {
    ID_pessoa: number = 0;
    nome: string = "";
    sobrenome: string = "";
    cpf: string = "";
    data_nascimento: string = "";
    celular: string = "";
    email: string = "";
    ID_endereco: number= 0;
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
