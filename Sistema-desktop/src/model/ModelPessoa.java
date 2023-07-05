package model;
import java.util.Date;

/**
*
* @author Brendon
*/
public class ModelPessoa {

    private Integer ID_pessoa;
    private String nome;
    private String sobrenome;
    private String cpf;
    private Date data_nascimento;
    private String celular;
    private String email;
    private String img_perfil;
    private Integer ID_endereco;
    private String cidade;
    private String bairro;
    private String rua;
    private String uf;
    private Integer numero;
    private String referencia;
    private String cep;
    private Integer FK_pessoa;

    /**
    * Construtor
    */
    public ModelPessoa(){}

    /**
    * seta o valor de ID_pessoa
    * @param pID_pessoa
    */
    public void setID_pessoa(Integer pID_pessoa){
        this.ID_pessoa = pID_pessoa;
    }
    /**
    * @return pk_ID_pessoa
    */
    public Integer getID_pessoa(){
        return this.ID_pessoa;
    }

    /**
    * seta o valor de nome
    * @param pNome
    */
    public void setNome(String pNome){
        this.nome = pNome;
    }
    /**
    * @return nome
    */
    public String getNome(){
        return this.nome;
    }

    /**
    * seta o valor de sobrenome
    * @param pSobrenome
    */
    public void setSobrenome(String pSobrenome){
        this.sobrenome = pSobrenome;
    }
    /**
    * @return sobrenome
    */
    public String getSobrenome(){
        return this.sobrenome;
    }

    /**
    * seta o valor de cpf
    * @param pCpf
    */
    public void setCpf(String pCpf){
        this.cpf = pCpf;
    }
    /**
    * @return cpf
    */
    public String getCpf(){
        return this.cpf;
    }

    /**
    * seta o valor de data_nascimento
    * @param pData_nascimento
    */
    public void setData_nascimento(Date pData_nascimento){
        this.data_nascimento = pData_nascimento;
    }
    /**
    * @return data_nascimento
    */
    public Date getData_nascimento(){
        return this.data_nascimento;
    }

    /**
    * seta o valor de celular
    * @param pCelular
    */
    public void setCelular(String pCelular){
        this.celular = pCelular;
    }
    /**
    * @return celular
    */
    public String getCelular(){
        return this.celular;
    }

    /**
    * seta o valor de email
    * @param pEmail
    */
    public void setEmail(String pEmail){
        this.email = pEmail;
    }
    /**
    * @return email
    */
    public String getEmail(){
        return this.email;
    }

    /**
    * seta o valor de img_perfil
    * @param pImg_perfil
    */
    public void setImg_perfil(String pImg_perfil){
        this.img_perfil = pImg_perfil;
    }
    /**
    * @return img_perfil
    */
    public String getImg_perfil(){
        return this.img_perfil;
    }

    /**
    * seta o valor de ID_endereco
    * @param pID_endereco
    */
    public void setID_endereco(Integer pID_endereco){
        this.ID_endereco = pID_endereco;
    }
    /**
    * @return pk_ID_endereco
    */
    public Integer getID_endereco(){
        return this.ID_endereco;
    }

    /**
    * seta o valor de cidade
    * @param pCidade
    */
    public void setCidade(String pCidade){
        this.cidade = pCidade;
    }
    /**
    * @return cidade
    */
    public String getCidade(){
        return this.cidade;
    }

    /**
    * seta o valor de bairro
    * @param pBairro
    */
    public void setBairro(String pBairro){
        this.bairro = pBairro;
    }
    /**
    * @return bairro
    */
    public String getBairro(){
        return this.bairro;
    }

    /**
    * seta o valor de rua
    * @param pRua
    */
    public void setRua(String pRua){
        this.rua = pRua;
    }
    /**
    * @return rua
    */
    public String getRua(){
        return this.rua;
    }

    /**
    * seta o valor de uf
    * @param pUf
    */
    public void setUf(String pUf){
        this.uf = pUf;
    }
    /**
    * @return uf
    */
    public String getUf(){
        return this.uf;
    }

    /**
    * seta o valor de numero
    * @param pNumero
    */
    public void setNumero(Integer pNumero){
        this.numero = pNumero;
    }
    /**
    * @return numero
    */
    public Integer getNumero(){
        return this.numero;
    }

    /**
    * seta o valor de referencia
    * @param pReferencia
    */
    public void setReferencia(String pReferencia){
        this.referencia = pReferencia;
    }
    /**
    * @return referencia
    */
    public String getReferencia(){
        return this.referencia;
    }

    /**
    * seta o valor de cep
    * @param pCep
    */
    public void setCep(String pCep){
        this.cep = pCep;
    }
    /**
    * @return cep
    */
    public String getCep(){
        return this.cep;
    }

    /**
    * seta o valor de FK_pessoa
    * @param pFK_pessoa
    */
    public void setFK_pessoa(Integer pFK_pessoa){
        this.FK_pessoa = pFK_pessoa;
    }
    /**
    * @return fk_FK_pessoa
    */
    public Integer getFK_pessoa(){
        return this.FK_pessoa;
    }

    @Override
    public String toString(){
        return "ModelPessoa {" + "::ID_pessoa = " + this.ID_pessoa + "::nome = " + this.nome + "::sobrenome = " + this.sobrenome + "::cpf = " + this.cpf + "::data_nascimento = " + this.data_nascimento + "::celular = " + this.celular + "::email = " + this.email + "::img_perfil = " + this.img_perfil + "::ID_endereco = " + this.ID_endereco + "::cidade = " + this.cidade + "::bairro = " + this.bairro + "::rua = " + this.rua + "::uf = " + this.uf + "::numero = " + this.numero + "::referencia = " + this.referencia + "::cep = " + this.cep + "::FK_pessoa = " + this.FK_pessoa +  "}";
    }
}