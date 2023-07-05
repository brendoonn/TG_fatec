package model;

import java.util.Date;

/**
*
* @author BRUNO
*/
public class ModelEmpresa {

    private int ID_empresa;
    private String emp_cnpj;
    private String emp_ie;
    private String emp_im;
    private String emp_nome;
    private String emp_nome_fantasia;
    private Date emp_data;
    private String emp_logradouro;
    private String emp_numero;
    private String emp_complemento;
    private String emp_cep;
    private String emp_bairro;
    private String emp_municipio;
    private String emp_uf;
    private String emp_telefone;
    private String emp_imagem;
    private String emp_logomarca_claro;

    /**
    * Construtor
    */
    public ModelEmpresa(){}

    /**
    * seta o valor de ID_empresa
    * @param pID_empresa
    */
    public void setID_empresa(int pID_empresa){
        this.ID_empresa = pID_empresa;
    }
    /**
    * @return ID_empresa
    */
    public int getID_empresa(){
        return this.ID_empresa;
    }

    /**
    * seta o valor de emp_cnpj
    * @param pEmp_cnpj
    */
    public void setEmp_cnpj(String pEmp_cnpj){
        this.emp_cnpj = pEmp_cnpj;
    }
    /**
    * @return emp_cnpj
    */
    public String getEmp_cnpj(){
        return this.emp_cnpj;
    }

    /**
    * seta o valor de emp_ie
    * @param pEmp_ie
    */
    public void setEmp_ie(String pEmp_ie){
        this.emp_ie = pEmp_ie;
    }
    /**
    * @return emp_ie
    */
    public String getEmp_ie(){
        return this.emp_ie;
    }

    /**
    * seta o valor de emp_im
    * @param pEmp_im
    */
    public void setEmp_im(String pEmp_im){
        this.emp_im = pEmp_im;
    }
    /**
    * @return emp_im
    */
    public String getEmp_im(){
        return this.emp_im;
    }

    /**
    * seta o valor de emp_nome
    * @param pEmp_nome
    */
    public void setEmp_nome(String pEmp_nome){
        this.emp_nome = pEmp_nome;
    }
    /**
    * @return emp_nome
    */
    public String getEmp_nome(){
        return this.emp_nome;
    }

    /**
    * seta o valor de emp_nome_fantasia
    * @param pEmp_nome_fantasia
    */
    public void setEmp_nome_fantasia(String pEmp_nome_fantasia){
        this.emp_nome_fantasia = pEmp_nome_fantasia;
    }
    /**
    * @return emp_nome_fantasia
    */
    public String getEmp_nome_fantasia(){
        return this.emp_nome_fantasia;
    }

    /**
    * seta o valor de emp_data
    * @param pEmp_data
    */
    public void setEmp_data(Date pEmp_data){
        this.emp_data = pEmp_data;
    }
    /**
    * @return emp_data
    */
    public Date getEmp_data(){
        return this.emp_data;
    }

    /**
    * seta o valor de emp_logradouro
    * @param pEmp_logradouro
    */
    public void setEmp_logradouro(String pEmp_logradouro){
        this.emp_logradouro = pEmp_logradouro;
    }
    /**
    * @return emp_logradouro
    */
    public String getEmp_logradouro(){
        return this.emp_logradouro;
    }

    /**
    * seta o valor de emp_numero
    * @param pEmp_numero
    */
    public void setEmp_numero(String pEmp_numero){
        this.emp_numero = pEmp_numero;
    }
    /**
    * @return emp_numero
    */
    public String getEmp_numero(){
        return this.emp_numero;
    }

    /**
    * seta o valor de emp_complemento
    * @param pEmp_complemento
    */
    public void setEmp_complemento(String pEmp_complemento){
        this.emp_complemento = pEmp_complemento;
    }
    /**
    * @return emp_complemento
    */
    public String getEmp_complemento(){
        return this.emp_complemento;
    }

    /**
    * seta o valor de emp_cep
    * @param pEmp_cep
    */
    public void setEmp_cep(String pEmp_cep){
        this.emp_cep = pEmp_cep;
    }
    /**
    * @return emp_cep
    */
    public String getEmp_cep(){
        return this.emp_cep;
    }

    /**
    * seta o valor de emp_bairro
    * @param pEmp_bairro
    */
    public void setEmp_bairro(String pEmp_bairro){
        this.emp_bairro = pEmp_bairro;
    }
    /**
    * @return emp_bairro
    */
    public String getEmp_bairro(){
        return this.emp_bairro;
    }

    /**
    * seta o valor de emp_municipio
    * @param pEmp_municipio
    */
    public void setEmp_municipio(String pEmp_municipio){
        this.emp_municipio = pEmp_municipio;
    }
    /**
    * @return emp_municipio
    */
    public String getEmp_municipio(){
        return this.emp_municipio;
    }

    /**
    * seta o valor de emp_uf
    * @param pEmp_uf
    */
    public void setEmp_uf(String pEmp_uf){
        this.emp_uf = pEmp_uf;
    }
    /**
    * @return emp_uf
    */
    public String getEmp_uf(){
        return this.emp_uf;
    }

    /**
    * seta o valor de emp_telefone
    * @param pEmp_telefone
    */
    public void setEmp_telefone(String pEmp_telefone){
        this.emp_telefone = pEmp_telefone;
    }
    /**
    * @return emp_telefone
    */
    public String getEmp_telefone(){
        return this.emp_telefone;
    }

    /**
    * seta o valor de emp_imagem
    * @param pEmp_imagem
    */
    public void setEmp_imagem(String pEmp_imagem){
        this.emp_imagem = pEmp_imagem;
    }
    /**
    * @return emp_imagem
    */
    public String getEmp_imagem(){
        return this.emp_imagem;
    }

    /**
    * seta o valor de emp_logomarca
    * @param pEmp_logomarca
    */
    public void setEmp_logomarca_claro(String pEmp_logomarca_claro){
        this.emp_logomarca_claro = pEmp_logomarca_claro;
    }
    /**
    * @return emp_logomarca
    */
    public String getEmp_logomarca_claro(){
        return this.emp_logomarca_claro;
    }




    

    @Override
    public String toString(){
        return "ModelEmpresa {" + "::ID_empresa = " + this.ID_empresa + "::emp_cnpj = " + this.emp_cnpj + "::emp_ie = " + this.emp_ie + "::emp_im = " + this.emp_im + "::emp_nome = " + this.emp_nome + "::emp_nome_fantasia = " + this.emp_nome_fantasia + "::emp_data = " + this.emp_data + "::emp_logradouro = " + this.emp_logradouro + "::emp_numero = " + this.emp_numero + "::emp_complemento = " + this.emp_complemento + "::emp_cep = " + this.emp_cep + "::emp_bairro = " + this.emp_bairro + "::emp_municipio = " + this.emp_municipio + "::emp_uf = " + this.emp_uf + "::emp_telefone = " + this.emp_telefone + "::emp_imagem = " + this.emp_imagem + "::emp_logomarca_claro = " + this.emp_logomarca_claro +  "}";
    }
}