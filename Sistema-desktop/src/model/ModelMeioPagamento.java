package model;
/**
*
* @author Brendon
*/
public class ModelMeioPagamento {

    private Integer ID_forma_pagamento;
    private String forma_pag;
    private Boolean data_available;

    /**
    * Construtor
    */
    public ModelMeioPagamento(){}

    /**
    * seta o valor de ID_forma_pagamento
    * @param pID_forma_pagamento
    */
    public void setID_forma_pagamento(Integer pID_forma_pagamento){
        this.ID_forma_pagamento = pID_forma_pagamento;
    }
    /**
    * @return pk_ID_forma_pagamento
    */
    public Integer getID_forma_pagamento(){
        return this.ID_forma_pagamento;
    }

    /**
    * seta o valor de forma_pag
    * @param pForma_pag
    */
    public void setForma_pag(String pForma_pag){
        this.forma_pag = pForma_pag;
    }
    /**
    * @return forma_pag
    */
    public String getForma_pag(){
        return this.forma_pag;
    }

    /**
    * seta o valor de data_available
    * @param pData_available
    */
    public void setData_available(Boolean pData_available){
        this.data_available = pData_available;
    }
    /**
    * @return data_available
    */
    public Boolean getData_available(){
        return this.data_available;
    }

    @Override
    public String toString(){
        return "ModelMeioPagamento {" + "::ID_forma_pagamento = " + this.ID_forma_pagamento + "::forma_pag = " + this.forma_pag + "::data_available = " + this.data_available +  "}";
    }
}