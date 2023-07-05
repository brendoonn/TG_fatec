

    export class NovoUsuario{
        nome: string = "";
        sobrenome: string = "";
        cpf: string = "";
        celular: string = "";
        email: string = "";
        data_nascimento: string = "";
        FK_cargo: number = 0;
        login: string = "";
        senha: string = "";
        nivelDeAcesso: string = "";
        imagem: string = "";
        cidade: string = "";
        bairro: string = "";
        rua: string = "";
        uf: string = "";
        numero: number = 0;
        referencia: string = "";
        cep: string = "";
    }
    export class EditarFuncionario{
        ID_funcionario = 0;
        ID_pessoa = 0;
        nome: string = "";
        sobrenome: string = "";
        cpf: string = "";
        celular: string = "";
        email: string = "";
        data_nascimento: string = "";
        FK_cargo: number = 0;
        login: string = "";
        senha: string = "";
        nivelDeAcesso: string = "";
        imagem: string = "";
        cidade: string = "";
        bairro: string = "";
        rua: string = "";
        uf: string = "";
        numero: number = 0;
        referencia: string = "";
        cep: string = "";
    }

export class EditarUsuario {
    nome: string = "";
    sobrenome: string = "";
    cpf: string = "";
    celular: string = "";
    email: string = "";
    data_nascimento: string = "";
    FK_cargo: number = 0;
    cargo: string = "";
    imagem: string = "";
    cidade: string = "";
    bairro: string = "";
    rua: string = "";
    uf: string = "";
    numero: number = 0;
    referencia: string = "";
    cep: string = "";
}

export class EditarLogin {
    senhaAtual: string = "";
    novaSenha: string = "";
    confirmarSenha: string = "";
}

export class Cargo{
    ID_cargo: number = 0;
    cargo: string = "";
    data_available: Boolean = false;
}