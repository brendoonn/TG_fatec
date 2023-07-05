/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.StringCharacterIterator;

/**
 *
 * @author andre
 */
public class BLMascaras {

    /**
     * converte a virgula de uma string para ponto
     *
     * @param pString
     * @return String
     */
    public String converterVirgulaParaPonto(String pString) {
        String retorno = new String();
        int tamanhoString = pString.length();
        for (int i = 0; i < tamanhoString; i++) {
            if (pString.charAt(i) == ',') {
                retorno += '.';
            } else {
                retorno += pString.charAt(i);
            }
        }
        return retorno;
    }

    /**
     * converte a virgula de uma string para ponto
     *
     * @param pString
     * @return String
     */
    public String converterPontoPraVirgula(String pString) {
        String retorno = new String();
        int tamanhoString = pString.length();
        for (int i = 0; i < tamanhoString; i++) {
            if (pString.charAt(i) == '.') {
                retorno += ',';
            } else {
                retorno += pString.charAt(i);
            }
        }
        return retorno;
    }

    /**
     * converte a virgula de uma string para ponto
     *
     * @param pString
     * @return float
     */
    public float converterVirgulaParaPontoReturnFloat(String pString) {
        String retorno = new String();
        int tamanhoString = pString.length();
        for (int i = 0; i < tamanhoString; i++) {
            if (pString.charAt(i) == ',') {
                retorno += '.';
            } else {
                retorno += pString.charAt(i);
            }
        }
        return Float.parseFloat(retorno);
    }

    /**
     * retira os pontos do valor
     *
     * @param pString
     * @return
     */
    public String removerPontos(String pString) {
        String retorno = new String();
        int tamanhoString = pString.length();
        for (int i = 0; i < tamanhoString; i++) {
            if (pString.charAt(i) == '.') {
                retorno += "";
            } else {
                retorno += pString.charAt(i);
            }
        }
        return retorno;
    }

    /**
     * adiciona um ponto a string
     *
     * @param pString
     * @return String
     */
    public String addPonto(String pString) {
        int pontoConter = 0;
        for (int i = 0; i < pString.length(); i++) {
            if (pString.charAt(i) == '.') {
                pontoConter++;
            }
        }
        if (pontoConter == 0) {
            pString += ".0";
        }
        return pString;
    }

    /**
     * truca o valor com 3 casas decimais
     *
     * @param pValor
     * @return double
     */
    public double truncar3Casas(double pValor) {

        return Math.round(pValor * 100) / 100d;
    }

    public int converteInteiro(int pString) {
        DecimalFormat df = new DecimalFormat("#.0");
        pString = Integer.parseInt(df.format(pString));
        return pString;
    }

    /**
     * Arredonda com 2 casas decimais.
     */
    public double converteArredondar2Casas(double pDouble) {
        DecimalFormat df = new DecimalFormat("#,00");
        pDouble = Double.parseDouble(df.format(pDouble));
        return pDouble;
    }

    /**
     * arredonda um valor com ponto
     *
     * @param pValor
     * @return
     */
    public float arredondamentoComPontoDuasCasas(float pValor) {
        DecimalFormat df = new DecimalFormat("#.00");
        return Float.parseFloat(this.converterVirgulaParaPonto(df.format(pValor)));
    }

    /**
     * arredonda um valor com ponto
     *
     * @param pValor
     * @return
     */
    public Double arredondamentoComPontoDuasCasasDouble(Double pValor) {
        DecimalFormat df = new DecimalFormat("#.00");
        return Double.parseDouble(this.converterVirgulaParaPonto(df.format(pValor)));
    }

    /**
     * arredonda um valor com ponto
     *
     * @param pValor
     * @return
     */
    public Float arredondamentoComPontoDuasCasasFloat(Float pValor) {
        BigDecimal bd = new BigDecimal(pValor).setScale(2, RoundingMode.HALF_UP);
        pValor = bd.floatValue();
        return pValor;
        //DecimalFormat df = new DecimalFormat("#.00");
        //return Float.parseFloat(this.converterVirgulaParaPonto(df.format(pValor)));
    }

    /**
     * arredonda um valor com ponto string formatada
     *
     * @param pValor
     * @return
     */
    public String arredondamentoComPontoDuasCasasString(double pValor) {
        DecimalFormat df = new DecimalFormat("#.00");
        return this.converterVirgulaParaPonto(df.format(pValor));
    }

    /**
     * arredonda um valor com ponto
     *
     * @param pValor
     * @return
     */
    public float arredondamentoComPontoTresCasas(float pValor) {
        DecimalFormat df = new DecimalFormat("#.000");
        return Float.parseFloat(this.converterVirgulaParaPonto(df.format(pValor)));
    }

    /**
     * arredonda um valor com ponto
     *
     * @param pValor
     * @return
     */
    public String arredondamentoDoubleComPontoDuasCasasString(Double pValor) {
        DecimalFormat df = new DecimalFormat("#.00");
        return this.converterVirgulaParaPonto(df.format(pValor));
    }
    
    /**
     * Solução para gravar caminho de arquivo no MySql
     * @param texto
     * @return 
     */
    public static String adicionarBarras(String texto) {
        final StringBuffer sb = new StringBuffer(texto.length() * 2);
        final StringCharacterIterator iterador = new StringCharacterIterator(texto);

        char character = iterador.current();

        while (character != StringCharacterIterator.DONE) {
            if (character == '"')
                sb.append("\\\"");
            else if (character == '\'')
                sb.append("\\\'");
            else if (character == '\\')
                sb.append("\\\\");
            else if (character == '\n')
                sb.append("\\n");
            else if (character == '{')
                sb.append("\\{");
            else if (character == '}')
                sb.append("\\}");
            else/*from www  . ja  v a2 s.  c  o m*/
                sb.append(character);

            character = iterador.next();
        }

        return sb.toString();
    }

}
