package model;
/**
*
* @author andre
*/
public class ModelFormaPagamento {

    private Integer ID_forma_pagamento;
    private String forma_pag;
    private boolean data_available;

    /**
    * Construtor
    */
    public ModelFormaPagamento(){}

    /**
    * seta o valor de ID_forma_pagamento
    * @param pID_forma_pagamento
    */
    public void setID_forma_pagamento(int pID_forma_pagamento){
        this.ID_forma_pagamento = pID_forma_pagamento;
    }
    /**
    * @return pk_ID_forma_pagamento
    */
    public int getID_forma_pagamento(){
        return this.ID_forma_pagamento;
    }



    /**
    * seta o valor de forma_pag
    * @param pforma_pag
    */
    public void setForPag(String pForPag){
        this.forma_pag = pForPag;
    }
    /**
    * @return forma_pag
    */
    public String getForPag(){
        return this.forma_pag;
    }



    /**
    * seta o valor de descontoForPag
    * @param data_available
    */
    public void setData_available(Boolean pData_available){
        this.data_available = pData_available;
    }
    /**
    * @return data_available
    */
    public boolean getData_available(){
        return this.data_available;
    }



    @Override
    public String toString(){
        return "ModelFormaPagamento {" + "::ID_forma_pagamento = " + this.ID_forma_pagamento + "::forma_pag = " + this.forma_pag + "::data_avaliable = " + this.data_available + "}";
    }
}