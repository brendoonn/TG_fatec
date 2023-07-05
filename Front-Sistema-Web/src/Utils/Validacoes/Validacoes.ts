import { cnpj, cpf } from "cpf-cnpj-validator";
import {
  formatarCep,
  formatarValorDigitado,
  verificaSeTemValor,
} from "./Mascaras";
import { ObterEnderecoViaCep } from "../Tools";

export function validarCpf(cpfDigitado: any) {
  var verificaCpf = cpf.isValid(cpfDigitado);
  return verificaCpf;
}

export function validarCnpj(cnpjDigitado: any) {
  var verificaCnpj = cnpj.isValid(cnpjDigitado);
  return verificaCnpj;
}


export function validarPreco(valor: any) {
  if (
    valor !== null &&
    valor !== "" &&
    valor !== "0,00" &&
    valor !== undefined
  ) {
    var transformarValor = valor.replace(",", ".");
    var conversao = parseFloat(transformarValor);
    if (conversao > 0) return true;
    else return false;
  }
  return false;
}

export const validarCamposEndereco = (setErros: any, validacao: any) => {
  if (!validacao.values.uf) {
    setErros((errosAntigos: any) =>
      Object.assign({}, errosAntigos, { ["uf"]: true })
    );
  }

  if (!validacao.values.cidade) {
    setErros((errosAntigos: any) =>
      Object.assign({}, errosAntigos, { ["cidade"]: true })
    );
  }

  if (!validacao.values.rua) {
    setErros((errosAntigos: any) =>
      Object.assign({}, errosAntigos, { ["rua"]: true })
    );
  }
};

export const buscarCep = async (event: any, validacao: any, setErros: any) => {
  try {
    var cepDigitado = formatarValorDigitado(event);
    validacao.setFieldValue("cep", cepDigitado);
    if (cepDigitado.length === 8) {
      validacao.setFieldValue("cep", formatarCep(cepDigitado));
      var informacoesEndereco = await ObterEnderecoViaCep(cepDigitado);

      if (informacoesEndereco != null && !informacoesEndereco.erro) {
        validacao.setFieldValue("rua", informacoesEndereco.logradouro);
        validacao.setFieldValue("uf", informacoesEndereco.uf);
        validacao.setFieldValue("cidade", informacoesEndereco.localidade);
        setErros((errosAntigos: any) =>
          Object.assign({}, errosAntigos, { ["rua"]: false })
        );
        setErros((errosAntigos: any) =>
          Object.assign({}, errosAntigos, { ["uf"]: false })
        );
        setErros((errosAntigos: any) =>
          Object.assign({}, errosAntigos, { ["cidade"]: false })
        );

        validacao.setFieldValue("bairro", informacoesEndereco.bairro);
      } else {
        validacao.setFieldValue("rua", "");
        validacao.setFieldValue("cidade", "");
        validacao.setFieldValue("bairro", "");
        validacao.setFieldValue("uf", "");
      }
    } else {
      validacao.setFieldValue("rua", "");
      validacao.setFieldValue("cidade", "");
      validacao.setFieldValue("bairro", "");
      validacao.setFieldValue("uf", "");
    }
  } catch (error) {
    console.log("erro", error);
  }
};

export function validarSenha(senha: any) {
  if (verificaSeTemValor(senha)) {
    const criterios = [
      senha.length >= 8, // Pelo menos 8 caracteres
      /[A-Z]/.test(senha), // Pelo menos uma letra maiúscula
      /\d/.test(senha), // Pelo menos um dígito numérico
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha), // Pelo menos um caractere especial
    ];

    return criterios.every((criterio) => criterio);
  }
  return senha;
}
