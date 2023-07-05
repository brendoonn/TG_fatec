import { cnpj, cpf } from "cpf-cnpj-validator";
import { converterValor, converterPeso } from "../Tools";

export function verificaSeTemValor(valor: any) {
  if (valor !== "" && valor !== null && valor !== undefined) {
    return true;
  }
  return false;
}

export function formatarValorDigitado(valor: any) {
  if (verificaSeTemValor(valor)) {
    valor = valor.replace(/([^\d])+/gim, "");
  }
  return valor;
}

export function mascaraData(validadeDig: any) {
  validadeDig = formatarValorDigitado(validadeDig);
  if (verificaSeTemValor(validadeDig)) {
    validadeDig = validadeDig.replace(/^(\d{2})(\d)/g, "$1-$2");
    validadeDig = validadeDig.replace(/^(\d{2})\S(\d{2})(\d)/g, "$1-$2-$3");
  }

  return validadeDig;
}

export function mascaraTelefone(telDig: any) {
  telDig = formatarValorDigitado(telDig);
  if (verificaSeTemValor(telDig)) {
    if (telDig.length > 10) {
      telDig = telDig.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (telDig.length > 6) {
      telDig = telDig.replace(/^(\d\d)(\d{4})(\d{0,5}).*/, "($1) $2-$3");
    } else if (telDig.length > 2) {
      telDig = telDig.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
  }

  return telDig;
}

export function formatarCpf(cpfDigitado: any) {
  cpfDigitado = formatarValorDigitado(cpfDigitado);
  if (verificaSeTemValor(cpfDigitado)) {
    cpfDigitado = cpf.format(cpfDigitado);
  }
  return cpfDigitado;
}

export function formatarPrecoRealSimbolo(valor: any) {
  var valorFormatado = valor;
  if (verificaSeTemValor(valorFormatado)) {
    valorFormatado = valorFormatado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return valorFormatado;
}

export function formatarPrecoPadrao(valor: any) {
  var valorFormatado = valor;
  if(verificaSeTemValor(valorFormatado)){
      valorFormatado = valorFormatado.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      });
  }

  return valorFormatado;
}
export function formatarPrecoReal(valor: any) {
  if (verificaSeTemValor(valor)) {
    var conversao = converterValor(valor);
    return formatarPrecoPadrao(conversao);
  }
  return "0,00";
}

export function formatarPesoPadrao(peso: any) {
  var valorFormatado = peso;
  if (valorFormatado !== undefined) {
    valorFormatado = valorFormatado.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  }
  return valorFormatado;
}

export function formatarPeso(peso: any) {
  if (peso !== null && peso !== "") {
    var conversao = converterPeso(peso);
    return formatarPesoPadrao(conversao);
  }
  return "0,00";
}

export function formatarCnpj(cnpjDigitado: any) {
  cnpjDigitado = formatarValorDigitado(cnpjDigitado);
  if (cnpjDigitado !== "") {
    cnpjDigitado = cnpj.format(cnpjDigitado);
  }
  return cnpjDigitado;
}

export function formatarCep(cepDigitado: any) {
  cepDigitado = formatarValorDigitado(cepDigitado);
  if (cepDigitado !== "") {
    cepDigitado = cepDigitado.replace(/^(\d{5})(\d)/g, "$1-$2");
    cepDigitado = cepDigitado.replace(/^(\d{5})\s(\d{3})(\d)/g, "$1-$2");
  }

  return cepDigitado;
}

export function formatarDataParaEstiloBrasileiro(dataNaoFormatada: any) {
  if (verificaSeTemValor(dataNaoFormatada)) {
    const data = new Date(dataNaoFormatada);
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1;
    const ano = data.getUTCFullYear();

    const dataFormatada = `${dia < 10 ? "0" + dia : dia}-${
      mes < 10 ? "0" + mes : mes
    }-${ano}`;
    return dataFormatada;
  }
  return dataNaoFormatada;
}
export function formatarDataParaEstiloAmericano(dataNaoFormatada: any) {
  if (verificaSeTemValor(dataNaoFormatada)) {
    const partes = dataNaoFormatada.split("-");
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
  }
  return dataNaoFormatada;
}