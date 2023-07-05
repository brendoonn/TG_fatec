package model;
/**
*
* @author André
*/
public class ModelFornecedor {

    private int idFornecedor;
    private String forCnpj;
    private String forNome;
    private String forEndereco;
    private String forBairro;
    private String forCidade;
    private String forUf;
    private String forCep;
    private String forTelefone;

    /**
    * Construtor
    */
    public ModelFornecedor(){}

    /**
    * seta o valor de idFornecedor
    * @param pIdFornecedor
    */
    public void setIdFornecedor(int pIdFornecedor){
        this.idFornecedor = pIdFornecedor;
    }
    /**
    * @return pk_idFornecedor
    */
    public int getIdFornecedor(){
        return this.idFornecedor;
    }

    /**
    * seta o valor de forCnpj
    * @param pForCnpj
    */
    public void setForCnpj(String pForCnpj){
        this.forCnpj = pForCnpj;
    }
    /**
    * @return forCnpj
    */
    public String getForCnpj(){
        return this.forCnpj;
    }

    /**
    * seta o valor de forNome
    * @param pForNome
    */
    public void setForNome(String pForNome){
        this.forNome = pForNome;
    }
    /**
    * @return forNome
    */
    public String getForNome(){
        return this.forNome;
    }

    /**
    * seta o valor de forEndereco
    * @param pForEndereco
    */
    public void setForEndereco(String pForEndereco){
        this.forEndereco = pForEndereco;
    }
    /**
    * @return forEndereco
    */
    public String getForEndereco(){
        return this.forEndereco;
    }

    /**
    * seta o valor de forBairro
    * @param pForBairro
    */
    public void setForBairro(String pForBairro){
        this.forBairro = pForBairro;
    }
    /**
    * @return forBairro
    */
    public String getForBairro(){
        return this.forBairro;
    }

    /**
    * seta o valor de forCidade
    * @param pForCidade
    */
    public void setForCidade(String pForCidade){
        this.forCidade = pForCidade;
    }
    /**
    * @return forCidade
    */
    public String getForCidade(){
        return this.forCidade;
    }

    /**
    * seta o valor de forUf
    * @param pForUf
    */
    public void setForUf(String pForUf){
        this.forUf = pForUf;
    }
    /**
    * @return forUf
    */
    public String getForUf(){
        return this.forUf;
    }

    /**
    * seta o valor de forCep
    * @param pForCep
    */
    public void setForCep(String pForCep){
        this.forCep = pForCep;
    }
    /**
    * @return forCep
    */
    public String getForCep(){
        return this.forCep;
    }

    /**
    * seta o valor de forTelefone
    * @param pForTelefone
    */
    public void setForTelefone(String pForTelefone){
        this.forTelefone = pForTelefone;
    }
    /**
    * @return forTelefone
    */
    public String getForTelefone(){
        return this.forTelefone;
    }

    @Override
    public String toString(){
        return "ModelFornecedor {" + "::idFornecedor = " + this.idFornecedor + "::forCnpj = " + this.forCnpj + "::forNome = " + this.forNome + "::forEndereco = " + this.forEndereco + "::forBairro = " + this.forBairro + "::forCidade = " + this.forCidade + "::forUf = " + this.forUf + "::forCep = " + this.forCep + "::forTelefone = " + this.forTelefone +  "}";
    }
}